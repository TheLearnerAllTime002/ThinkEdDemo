import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, onToggleHistory }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-glass-border glass rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 my-2">
      {/* Home Button and AI Tutor Info */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        {/* Home Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          iconName="Home"
          className="spring-bounce flex-shrink-0 rounded-full"
          title="Go to Home"
        />
        
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            {/* Circular AI Tutor Icon Background */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <Icon name="GraduationCap" size={18} className="sm:w-6 sm:h-6" color="white" />
            </div>
            {/* Online Status Indicator */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-background shadow-sm ${
              isOnline ? 'bg-success' : 'bg-muted-foreground'
            }`} />
          </div>
          
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-foreground truncate">{t('aiTutor.title')}</h2>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'
              }`} />
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {isOnline ? t('aiTutor.readyToHelp') : t('aiTutor.offline')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {/* Clear Chat */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          iconName="RotateCcw"
          className="spring-bounce rounded-full"
          title={t('aiTutor.newChat')}
        />
      </div>
    </div>
  );
};

export default ChatHeader;