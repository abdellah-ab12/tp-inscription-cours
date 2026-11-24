const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();

exports.onEnrollmentCreated = onDocumentCreated("enrollments/{id}", async (event) => {
  const db = getFirestore();
  const ref = event.data.ref;
  const { courseId, studentId } = event.data.data();
  const courseRef = db.doc(`courses/${courseId}`);

  const result = await db.runTransaction(async (tx) => {
    // Idempotence : si l'inscription a déjà été traitée, on ne refait rien
    const enrollment = await tx.get(ref);
    if (enrollment.data().status !== "pending") return "skipped";

    const courseSnap = await tx.get(courseRef);
    if (!courseSnap.exists) {
      tx.update(ref, { status: "refused" });
      return "refused";
    }
    const course = courseSnap.data();
    if (course.inscrits >= course.capacite) {
      tx.update(ref, { status: "refused" });
      return "refused";
    }
    tx.update(courseRef, { inscrits: FieldValue.increment(1) });
    tx.update(ref, { status: "confirmed" });
    return "confirmed";
  });

  console.log(`Inscription ${event.params.id} : ${result}`);

  if (result === "confirmed") {
    const studentSnap = await db.doc(`students/${studentId}`).get();
    const email = studentSnap.exists ? studentSnap.data().email : "(inconnu)";
    console.log(`E-MAIL DE CONFIRMATION envoyé à ${email} pour le cours ${courseId}`);
  }
});