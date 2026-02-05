import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase-client";
import { CalendarEvent, News, Post, LocalizedContent } from "@/type/type";

// Events Services
export const eventService = {
  async getAll() {
    const q = query(collection(db, "events"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as CalendarEvent,
    );
  },

  async getById(id: string) {
    const docRef = doc(db, "events", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as CalendarEvent;
    }
    return null;
  },

  async create(event: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "events"), {
      ...event,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  },

  async update(id: string, event: Partial<CalendarEvent>) {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, {
      ...event,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: string) {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
  },
};

// News Services
export const newsService = {
  async getAll() {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as News,
    );
  },

  async getPublished() {
    const q = query(
      collection(db, "news"),
      where("published", "==", true),
      orderBy("date", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as News,
    );
  },

  async getById(id: string) {
    const docRef = doc(db, "news", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as News;
    }
    return null;
  },

  async create(news: Omit<News, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "news"), {
      ...news,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  },

  async update(id: string, news: Partial<News>) {
    const docRef = doc(db, "news", id);
    await updateDoc(docRef, {
      ...news,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: string) {
    const docRef = doc(db, "news", id);
    await deleteDoc(docRef);
  },
};

// Posts Services
export const postService = {
  async getAll() {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Post,
    );
  },

  async getPublished() {
    const q = query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Post,
    );
  },

  async getById(id: string) {
    const docRef = doc(db, "posts", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Post;
    }
    return null;
  },

  async create(post: Omit<Post, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  },

  async update(id: string, post: Partial<Post>) {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      ...post,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: string) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  },
};

// Helper function to create empty localized content
export const createEmptyLocalizedContent = (): LocalizedContent => ({
  ru: "",
  en: "",
  de: "",
});
