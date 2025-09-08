import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  increment,
  serverTimestamp 
} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { db, auth } from "../firebase";

// Demo data for development
const DEMO_DATA = {
  users: [
    { 
      id: "user1", 
      name: "Amit Sharma", 
      email: "amit@example.com",
      xp: 1200, 
      streak: 7, 
      badges: ["Starter", "Math Wiz", "Quick Learner"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      joinedAt: new Date("2024-01-15"),
      lastActive: new Date()
    },
    { 
      id: "user2", 
      name: "Meena Roy", 
      email: "meena@example.com",
      xp: 900, 
      streak: 5, 
      badges: ["Starter", "Language Master"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meena",
      joinedAt: new Date("2024-02-01"),
      lastActive: new Date()
    }
  ],
  courses: [
    { 
      id: "course1", 
      title: "Basic Algebra", 
      description: "Master the fundamentals of algebra with interactive lessons",
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      difficulty: "Beginner",
      category: "Mathematics",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      enrolledStudents: 1250,
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"
    },
    { 
      id: "course2", 
      title: "Physics for Beginners", 
      description: "Explore the wonders of physics through hands-on experiments",
      progress: 30,
      totalLessons: 25,
      completedLessons: 8,
      difficulty: "Beginner",
      category: "Science",
      instructor: "Prof. Michael Chen",
      rating: 4.6,
      enrolledStudents: 890,
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400"
    },
    { 
      id: "course3", 
      title: "Intro to Web Development", 
      description: "Build your first website with HTML, CSS, and JavaScript",
      progress: 10,
      totalLessons: 30,
      completedLessons: 3,
      difficulty: "Intermediate",
      category: "Technology",
      instructor: "Alex Rodriguez",
      rating: 4.9,
      enrolledStudents: 2100,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400"
    }
  ],
  forum: [
    { 
      id: "post1", 
      user: "Amit Sharma", 
      userId: "user1",
      question: "How to solve quadratic equations effectively?", 
      answers: [
        {
          id: "answer1",
          user: "Dr. Sarah Johnson",
          userId: "instructor1",
          content: "Try factorization first, then use the quadratic formula if needed.",
          likes: 15,
          createdAt: new Date("2024-03-01")
        },
        {
          id: "answer2",
          user: "Meena Roy",
          userId: "user2",
          content: "I found completing the square method very helpful for understanding!",
          likes: 8,
          createdAt: new Date("2024-03-02")
        }
      ],
      tags: ["mathematics", "algebra", "equations"],
      likes: 23,
      views: 156,
      createdAt: new Date("2024-02-28")
    },
    { 
      id: "post2", 
      user: "Meena Roy", 
      userId: "user2",
      question: "Any tips for understanding Newton's laws of motion?", 
      answers: [
        {
          id: "answer3",
          user: "Prof. Michael Chen",
          userId: "instructor2",
          content: "Think about forces in pairs - every action has an equal and opposite reaction!",
          likes: 12,
          createdAt: new Date("2024-03-05")
        }
      ],
      tags: ["physics", "mechanics", "newton"],
      likes: 18,
      views: 89,
      createdAt: new Date("2024-03-04")
    }
  ],
  aiChats: [
    {
      id: "chat1",
      userId: "user1",
      messages: [
        {
          id: "msg1",
          role: "user",
          content: "Can you help me understand calculus derivatives?",
          timestamp: new Date("2024-03-10T10:00:00")
        },
        {
          id: "msg2",
          role: "assistant",
          content: "Of course! A derivative represents the rate of change of a function. Think of it as the slope of a curve at any given point. Would you like me to start with a simple example?",
          timestamp: new Date("2024-03-10T10:00:30")
        }
      ],
      title: "Calculus Help",
      createdAt: new Date("2024-03-10T10:00:00"),
      updatedAt: new Date("2024-03-10T10:00:30")
    }
  ]
};

// Authentication Services
export const authService = {
  // Sign up with email and password
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: displayName,
        email: email,
        xp: 0,
        streak: 0,
        badges: ["Starter"],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`,
        joinedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      });
      
      return user;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          xp: 0,
          streak: 0,
          badges: ["Starter"],
          avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`,
          joinedAt: serverTimestamp(),
          lastActive: serverTimestamp()
        });
      }
      
      return user;
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }
};

// User Services
export const userService = {
  // Get all users (for demo purposes)
  async getUsers() {
    try {
      // In development, return demo data
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.users;
      }
      
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Get users error:", error);
      return DEMO_DATA.users; // Fallback to demo data
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.users.find(user => user.id === userId);
      }
      
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Get user error:", error);
      return DEMO_DATA.users[0]; // Fallback to demo data
    }
  },

  // Update user XP
  async addXP(userId, points) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Adding ${points} XP to user ${userId}`);
        return;
      }
      
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        xp: increment(points),
        lastActive: serverTimestamp()
      });
    } catch (error) {
      console.error("Add XP error:", error);
    }
  },

  // Update user streak
  async updateStreak(userId, streakCount) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Updating streak to ${streakCount} for user ${userId}`);
        return;
      }
      
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        streak: streakCount,
        lastActive: serverTimestamp()
      });
    } catch (error) {
      console.error("Update streak error:", error);
    }
  }
};

// Course Services
export const courseService = {
  // Get all courses
  async getCourses() {
    try {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.courses;
      }
      
      const querySnapshot = await getDocs(collection(db, "courses"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Get courses error:", error);
      return DEMO_DATA.courses;
    }
  },

  // Get course by ID
  async getCourseById(courseId) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.courses.find(course => course.id === courseId);
      }
      
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Get course error:", error);
      return DEMO_DATA.courses[0];
    }
  },

  // Update course progress
  async updateProgress(userId, courseId, progress) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Updating progress to ${progress}% for course ${courseId}, user ${userId}`);
        return;
      }
      
      const progressRef = doc(db, "userProgress", `${userId}_${courseId}`);
      await updateDoc(progressRef, {
        progress: progress,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Update progress error:", error);
    }
  }
};

// Forum Services
export const forumService = {
  // Get all forum posts
  async getForumPosts() {
    try {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.forum;
      }
      
      const q = query(collection(db, "forum"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Get forum posts error:", error);
      return DEMO_DATA.forum;
    }
  },

  // Add new forum post
  async addForumPost(userId, userName, question, tags = []) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Adding forum post by ${userName}: ${question}`);
        return;
      }
      
      await addDoc(collection(db, "forum"), {
        userId,
        user: userName,
        question,
        answers: [],
        tags,
        likes: 0,
        views: 0,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Add forum post error:", error);
    }
  },

  // Add answer to forum post
  async addAnswer(postId, userId, userName, content) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Adding answer by ${userName} to post ${postId}`);
        return;
      }
      
      const postRef = doc(db, "forum", postId);
      const postDoc = await getDoc(postRef);
      
      if (postDoc.exists()) {
        const currentAnswers = postDoc.data().answers || [];
        const newAnswer = {
          id: `answer_${Date.now()}`,
          userId,
          user: userName,
          content,
          likes: 0,
          createdAt: new Date()
        };
        
        await updateDoc(postRef, {
          answers: [...currentAnswers, newAnswer]
        });
      }
    } catch (error) {
      console.error("Add answer error:", error);
    }
  }
};

// AI Chat Services
export const aiChatService = {
  // Get user's chat history
  async getChatHistory(userId) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return DEMO_DATA.aiChats.filter(chat => chat.userId === userId);
      }
      
      const q = query(
        collection(db, "aiChats"), 
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Get chat history error:", error);
      return DEMO_DATA.aiChats;
    }
  },

  // Save chat message
  async saveChatMessage(userId, chatId, message) {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Saving message for chat ${chatId}:`, message);
        return;
      }
      
      const chatRef = doc(db, "aiChats", chatId);
      const chatDoc = await getDoc(chatRef);
      
      if (chatDoc.exists()) {
        const currentMessages = chatDoc.data().messages || [];
        await updateDoc(chatRef, {
          messages: [...currentMessages, message],
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new chat
        await addDoc(collection(db, "aiChats"), {
          userId,
          messages: [message],
          title: message.content.substring(0, 50) + "...",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Save chat message error:", error);
    }
  }
};

export default {
  authService,
  userService,
  courseService,
  forumService,
  aiChatService
};