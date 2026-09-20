import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/config";
import type { FirestoreTestimonial } from "../types/firestore";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<FirestoreTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "testimonials")), (snap) => {
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreTestimonial)));
      setLoading(false);
    });
    return unsub;
  }, []);

  return { testimonials, loading };
}