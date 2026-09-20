import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import type { FirestoreProject } from "../types/firestore";

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<FirestoreProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "projects"), where("slug", "==", slug));
    const unsub = onSnapshot(q, (snap) => {
      const d = snap.docs[0];
      setProject(d ? ({ id: d.id, ...d.data() } as FirestoreProject) : null);
      setLoading(false);
    });
    return unsub;
  }, [slug]);

  return { project, loading };
}