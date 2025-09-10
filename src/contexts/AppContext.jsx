import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { userService } from '../services/firebaseService';

// Initial state
const initialState = {
  user: null,
  userProfile: null,
  loading: true,
  courses: [],
  forumPosts: [],
  aiChats: [],
  notifications: [],
  theme: 'light'
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_USER_PROFILE: 'SET_USER_PROFILE',
  SET_LOADING: 'SET_LOADING',
  SET_COURSES: 'SET_COURSES',
  SET_FORUM_POSTS: 'SET_FORUM_POSTS',
  SET_AI_CHATS: 'SET_AI_CHATS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_THEME: 'SET_THEME',
  UPDATE_USER_XP: 'UPDATE_USER_XP',
  UPDATE_USER_STREAK: 'UPDATE_USER_STREAK'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case ActionTypes.SET_USER_PROFILE:
      return { ...state, userProfile: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_COURSES:
      return { ...state, courses: action.payload };
    
    case ActionTypes.SET_FORUM_POSTS:
      return { ...state, forumPosts: action.payload };
    
    case ActionTypes.SET_AI_CHATS:
      return { ...state, aiChats: action.payload };
    
    case ActionTypes.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    
    case ActionTypes.REMOVE_NOTIFICATION:
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    
    case ActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ActionTypes.UPDATE_USER_XP:
      return {
        ...state,
        userProfile: state.userProfile ? {
          ...state.userProfile,
          xp: state.userProfile.xp + action.payload
        } : null
      };
    
    case ActionTypes.UPDATE_USER_STREAK:
      return {
        ...state,
        userProfile: state.userProfile ? {
          ...state.userProfile,
          streak: action.payload
        } : null
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch({ type: ActionTypes.SET_USER, payload: user });
      
      if (user) {
        try {
          // Get user profile from Firestore
          const userProfile = await userService.getUserById(user.uid);
          dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: userProfile });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Use demo data for development
          const demoUser = {
            id: user.uid,
            name: user.displayName || 'Demo User',
            email: user.email,
            xp: 1200,
            streak: 7,
            badges: ['Starter', 'Quick Learner'],
            avatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName || 'Demo'}`,
            joinedAt: new Date(),
            lastActive: new Date()
          };
          dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: demoUser });
        }
      } else {
        dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: null });
      }
      
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    });

    return () => unsubscribe();
  }, []);

  // Actions
  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    
    setUserProfile: (profile) => dispatch({ type: ActionTypes.SET_USER_PROFILE, payload: profile }),
    
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    
    setCourses: (courses) => dispatch({ type: ActionTypes.SET_COURSES, payload: courses }),
    
    setForumPosts: (posts) => dispatch({ type: ActionTypes.SET_FORUM_POSTS, payload: posts }),
    
    setAiChats: (chats) => dispatch({ type: ActionTypes.SET_AI_CHATS, payload: chats }),
    
    addNotification: (notification) => {
      const id = Date.now().toString();
      dispatch({ 
        type: ActionTypes.ADD_NOTIFICATION, 
        payload: { ...notification, id } 
      });
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
      }, 5000);
    },
    
    removeNotification: (id) => dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id }),
    
    setTheme: (theme) => {
      dispatch({ type: ActionTypes.SET_THEME, payload: theme });
      localStorage.setItem('theme', theme);
      
      // Update document class for theme switching
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    updateUserXP: (xpGained) => {
      dispatch({ type: ActionTypes.UPDATE_USER_XP, payload: xpGained });
      
      // Show notification
      actions.addNotification({
        type: 'success',
        title: 'XP Gained!',
        message: `You earned ${xpGained} XP points!`,
        icon: 'Trophy'
      });
    },
    
    updateUserStreak: (newStreak) => {
      dispatch({ type: ActionTypes.UPDATE_USER_STREAK, payload: newStreak });
      
      // Show notification for streak milestones
      if (newStreak > 0 && newStreak % 7 === 0) {
        actions.addNotification({
          type: 'success',
          title: 'Streak Milestone!',
          message: `Amazing! You've maintained a ${newStreak}-day learning streak!`,
          icon: 'Flame'
        });
      }
    }
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    actions.setTheme(savedTheme);
  }, []);

  const value = {
    ...state,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;