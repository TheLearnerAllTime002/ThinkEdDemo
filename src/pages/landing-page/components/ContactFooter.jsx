import { useAnimationConfig } from '../../../hooks/useReducedMotion';
import { AiOutlineMail } from 'react-icons/ai';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // "X" rebrand for Twitter


const ContactFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();
  const { getAnimationProps } = useAnimationConfig();

 const socialLinks = [
  {
    name: "Gmail",
    icon: AiOutlineMail,
    href: "mailto:arjunmitra003@gmail.com",
    color: "text-red-500",
    hoverColor: "hover:bg-red-500/10",
    description: "Send us an email",
    gradient: "from-red-500 to-red-600",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/arjun-mitra-2761a9260/",
    color: "text-blue-600",
    hoverColor: "hover:bg-blue-600/10",
    description: "Connect with us",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/TheLearnerAllTime002/ThinkEdDemo",
    color: "text-gray-800 dark:text-gray-200",
    hoverColor: "hover:bg-gray-800/10 dark:hover:bg-gray-200/10",
    description: "View our code",
    gradient: "from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    href: "https://x.com/ArjunMitra15888",
    color: "text-blue-400",
    hoverColor: "hover:bg-blue-400/10",
    description: "Follow us",
    gradient: "from-blue-400 to-blue-500",
  }
];


  const quickLinks = [
    { label: "Home", path: "/landing-page", icon: "Home" },
    { label: "Dashboard", path: "/student-dashboard", icon: "LayoutDashboard" },
    { label: "Courses", path: "/courses-overview", icon: "BookOpen" },
    { label: "AI Tutor", path: "/ai-tutor-chat", icon: "Bot" },
    { label: "Profile", path: "/user-profile", icon: "User" }
  ];

  const supportLinks = [
    { label: "Help Center", action: () => console.log('Help Center'), icon: "HelpCircle" },
    { label: "Privacy Policy", action: () => console.log('Privacy Policy'), icon: "Shield" },
    { label: "Terms of Service", action: () => console.log('Terms of Service'), icon: "FileText" },
    { label: "Contact Support", action: () => window.open('mailto:support@thinked.edu'), icon: "MessageCircle" }
  ];

  const companyInfo = [
    { label: "About Us", action: () => console.log('About Us'), icon: "Info" },
    { label: "Careers", action: () => console.log('Careers'), icon: "Briefcase" },
    { label: "Blog", action: () => console.log('Blog'), icon: "PenTool" },
    { label: "Press Kit", action: () => console.log('Press Kit'), icon: "Download" }
  ];

  const containerVariants = getAnimationProps({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
