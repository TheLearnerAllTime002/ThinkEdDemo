import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProfileEditForm = ({ user, onSave, onCancel, currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio || '',
    location: user?.location || '',
    timezone: user?.timezone || 'Asia/Kolkata',
    learningGoals: user?.learningGoals || [],
    notifications: {
      email: user?.notifications?.email || true,
      push: user?.notifications?.push || true,
      weekly: user?.notifications?.weekly || false
    },
    privacy: {
      showProfile: user?.privacy?.showProfile || true,
      showProgress: user?.privacy?.showProgress || true,
      showBadges: user?.privacy?.showBadges || true
    }
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      editProfile: "Edit Profile",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      emailAddress: "Email Address",
      bio: "Bio",
      location: "Location",
      timezone: "Timezone",
      learningPreferences: "Learning Preferences",
      learningGoals: "Learning Goals",
      notifications: "Notifications",
      emailNotifications: "Email notifications",
      pushNotifications: "Push notifications",
      weeklyDigest: "Weekly digest",
      privacy: "Privacy Settings",
      showProfile: "Show profile to other users",
      showProgress: "Show learning progress",
      showBadges: "Show earned badges",
      save: "Save Changes",
      cancel: "Cancel",
      tellUsAbout: "Tell us about yourself",
      enterLocation: "Enter your location",
      selectGoals: "Select your learning goals"
    },
    hi: {
      editProfile: "प्रोफ़ाइल संपादित करें",
      personalInfo: "व्यक्तिगत जानकारी",
      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      bio: "बायो",
      location: "स्थान",
      timezone: "समय क्षेत्र",
      learningPreferences: "सीखने की प्राथमिकताएं",
      learningGoals: "सीखने के लक्ष्य",
      notifications: "सूचनाएं",
      emailNotifications: "ईमेल सूचनाएं",
      pushNotifications: "पुश सूचनाएं",
      weeklyDigest: "साप्ताहिक सारांश",
      privacy: "गोपनीयता सेटिंग्स",
      showProfile: "अन्य उपयोगकर्ताओं को प्रोफ़ाइल दिखाएं",
      showProgress: "सीखने की प्रगति दिखाएं",
      showBadges: "अर्जित बैज दिखाएं",
      save: "परिवर्तन सहेजें",
      cancel: "रद्द करें",
      tellUsAbout: "अपने बारे में बताएं",
      enterLocation: "अपना स्थान दर्ज करें",
      selectGoals: "अपने सीखने के लक्ष्य चुनें"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const timezoneOptions = [
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  const learningGoalOptions = [
    { value: 'math', label: currentLanguage === 'en' ? 'Mathematics' : 'गणित' },
    { value: 'science', label: currentLanguage === 'en' ? 'Science' : 'विज्ञान' },
    { value: 'programming', label: currentLanguage === 'en' ? 'Programming' : 'प्रोग्रामिंग' },
    { value: 'languages', label: currentLanguage === 'en' ? 'Languages' : 'भाषाएं' },
    { value: 'business', label: currentLanguage === 'en' ? 'Business' : 'व्यापार' },
    { value: 'arts', label: currentLanguage === 'en' ? 'Arts' : 'कला' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev?.[parent],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = currentLanguage === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'en' ? 'Email is required' : 'ईमेल आवश्यक है';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'en' ? 'Invalid email format' : 'अमान्य ईमेल प्रारूप';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-6 border border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Edit" size={24} color="var(--color-primary)" />
          <h2 className="heading-3">{t?.editProfile}</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="heading-4 mb-4 flex items-center space-x-2">
            <Icon name="User" size={20} />
            <span>{t?.personalInfo}</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label={t?.fullName}
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />
            
            <Input
              label={t?.emailAddress}
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              label={t?.bio}
              type="text"
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              placeholder={t?.tellUsAbout}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Input
              label={t?.location}
              type="text"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              placeholder={t?.enterLocation}
            />
            
            <Select
              label={t?.timezone}
              options={timezoneOptions}
              value={formData?.timezone}
              onChange={(value) => handleInputChange('timezone', value)}
            />
          </div>
        </div>

        {/* Learning Preferences */}
        <div>
          <h3 className="heading-4 mb-4 flex items-center space-x-2">
            <Icon name="BookOpen" size={20} />
            <span>{t?.learningPreferences}</span>
          </h3>
          
          <Select
            label={t?.learningGoals}
            options={learningGoalOptions}
            value={formData?.learningGoals}
            onChange={(value) => handleInputChange('learningGoals', value)}
            multiple
            searchable
            placeholder={t?.selectGoals}
          />
        </div>

        {/* Notifications */}
        <div>
          <h3 className="heading-4 mb-4 flex items-center space-x-2">
            <Icon name="Bell" size={20} />
            <span>{t?.notifications}</span>
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label={t?.emailNotifications}
              checked={formData?.notifications?.email}
              onChange={(e) => handleNestedChange('notifications', 'email', e?.target?.checked)}
            />
            
            <Checkbox
              label={t?.pushNotifications}
              checked={formData?.notifications?.push}
              onChange={(e) => handleNestedChange('notifications', 'push', e?.target?.checked)}
            />
            
            <Checkbox
              label={t?.weeklyDigest}
              checked={formData?.notifications?.weekly}
              onChange={(e) => handleNestedChange('notifications', 'weekly', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="heading-4 mb-4 flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span>{t?.privacy}</span>
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label={t?.showProfile}
              checked={formData?.privacy?.showProfile}
              onChange={(e) => handleNestedChange('privacy', 'showProfile', e?.target?.checked)}
            />
            
            <Checkbox
              label={t?.showProgress}
              checked={formData?.privacy?.showProgress}
              onChange={(e) => handleNestedChange('privacy', 'showProgress', e?.target?.checked)}
            />
            
            <Checkbox
              label={t?.showBadges}
              checked={formData?.privacy?.showBadges}
              onChange={(e) => handleNestedChange('privacy', 'showBadges', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-glass-border">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="flex-1 spring-bounce"
          >
            {t?.save}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            className="flex-1 spring-bounce"
            disabled={isLoading}
          >
            {t?.cancel}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileEditForm;