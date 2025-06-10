import { useState, useRef, useEffect } from 'react';
import { Menu, X, Heart, Calculator, User, BookOpen, Info, HelpCircle, Mail, ArrowLeft, Puzzle, Calendar, Gift, Gamepad, ChevronRight, Phone, Shield, FileText } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import LoveFactsCarousel from './ui/LoveFactsCarousel';
import LoveTest from './LoveTest';
import LoveCalculator from './LoveCalculator';
import DreamPartnerAnalyzer from './DreamPartnerAnalyzer';
import DailyTips from './DailyTips';
import LoveStories from './LoveStories';
import WordScramble from './WordScramble';
import HeartMemoryMatch from './HeartMemoryMatch';
import LoveStoryGenerator from './LoveStoryGenerator';
import GiftIdeas from './GiftIdeas';
import ImportantDays from './ImportantDays';
import MoodTracker from './MoodTracker';

type FeatureType = 
  | 'home' 
  | 'loveTest' 
  | 'loveCalculator' 
  | 'dreamPartner' 
  | 'dailyTips' 
  | 'loveStories' 
  | 'giftIdeas'
  | 'importantDays'
  | 'wordScramble'
  | 'memoryMatch'
  | 'storyGenerator'
  | 'moodTracker'
  | 'help'
  | 'privacy'
  | 'terms'
  | 'loveLab'
  | 'loveDaily'
  | 'lovePlayzone'
  | 'moodMirror';

interface Bundle {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  features: {
    id: FeatureType;
    title: string;
    description: string;
    icon: JSX.Element;
  }[];
}

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;

      const touchEnd = e.touches[0].clientX;
      const diff = touchEnd - touchStart;

      if (diff > 50 && touchStart < 50) { // Swipe from left edge
        setMenuOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [touchStart]);

  const bundles: Bundle[] = [
    {
      id: 'loveLab',
      title: '❤️‍🔥 Love Lab',
      icon: <Calculator className="w-6 h-6" />,
      description: 'Discover your romantic compatibility and relationship insights',
      features: [
        {
          id: 'loveTest',
          title: 'Test Your Love',
          description: 'Measure your relationship strength with our comprehensive test',
          icon: <Heart className="w-6 h-6" />
        },
        {
          id: 'loveCalculator',
          title: 'Name Compatibility',
          description: 'Calculate your romantic compatibility based on names',
          icon: <Calculator className="w-6 h-6" />
        },
        {
          id: 'dreamPartner',
          title: 'Dream Partner Analyzer',
          description: 'Discover how unique your partner preferences are',
          icon: <User className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'loveDaily',
      title: '💕 Love Daily',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Daily inspiration and ideas for your love life',
      features: [
        {
          id: 'dailyTips',
          title: 'Daily Love Tips',
          description: 'Get fresh relationship advice every day',
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          id: 'loveStories',
          title: 'Love Stories & Facts',
          description: 'Read heartwarming real-life love stories',
          icon: <Info className="w-6 h-6" />
        },
        {
          id: 'giftIdeas',
          title: 'Gift Ideas',
          description: 'Find the perfect gift for your loved one',
          icon: <Gift className="w-6 h-6" />
        },
        {
          id: 'importantDays',
          title: 'Important Love Days',
          description: "Don't miss any special romantic occasions",
          icon: <Calendar className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'lovePlayzone',
      title: '💘 Love Playzone',
      icon: <Gamepad className="w-6 h-6" />,
      description: 'Fun and interactive love-themed games',
      features: [
        {
          id: 'wordScramble',
          title: 'Love Word Scramble',
          description: 'Unscramble romantic words with helpful hints',
          icon: <Puzzle className="w-6 h-6" />
        },
        {
          id: 'memoryMatch',
          title: 'Heart Memory Match',
          description: 'Match pairs of romantic symbols',
          icon: <Heart className="w-6 h-6" />
        },
        {
          id: 'storyGenerator',
          title: 'Love Story Generator',
          description: 'Create your unique romantic story',
          icon: <BookOpen className="w-6 h-6" />
        }
      ]
    },
    {
      id: 'moodMirror',
      title: '💗 MoodMirror',
      icon: <Calendar className="w-6 h-6" />,
      description: 'Track and analyze your romantic journey',
      features: [
        {
          id: 'moodTracker',
          title: 'Mood Calendar',
          description: 'Log and track your daily romantic mood',
          icon: <Calendar className="w-6 h-6" />
        }
      ]
    }
  ];

  const menuItems = [
    { id: 'loveLab', title: '❤️‍🔥 Love Lab', icon: <Calculator className="w-5 h-5" /> },
    { id: 'loveDaily', title: '💕 Love Daily', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'lovePlayzone', title: '💘 Love Playzone', icon: <Gamepad className="w-5 h-5" /> },
    { id: 'moodMirror', title: '💗 MoodMirror', icon: <Calendar className="w-5 h-5" /> },
    { id: 'help', title: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> }
  ];

  const renderFeature = () => {
    switch(currentFeature) {
      case 'loveTest':
        return <LoveTest onBack={() => setCurrentFeature('loveLab')} />;
      case 'loveCalculator':
        return <LoveCalculator onBack={() => setCurrentFeature('loveLab')} />;
      case 'dreamPartner':
        return <DreamPartnerAnalyzer onBack={() => setCurrentFeature('loveLab')} />;
      case 'dailyTips':
        return <DailyTips onBack={() => setCurrentFeature('loveDaily')} />;
      case 'loveStories':
        return <LoveStories onBack={() => setCurrentFeature('loveDaily')} />;
      case 'wordScramble':
        return <WordScramble onBack={() => setCurrentFeature('lovePlayzone')} />;
      case 'memoryMatch':
        return <HeartMemoryMatch onBack={() => setCurrentFeature('lovePlayzone')} />;
      case 'storyGenerator':
        return <LoveStoryGenerator onBack={() => setCurrentFeature('lovePlayzone')} />;
      case 'giftIdeas':
        return <GiftIdeas onBack={() => setCurrentFeature('loveDaily')} />;
      case 'importantDays':
        return <ImportantDays onBack={() => setCurrentFeature('loveDaily')} />;
      case 'moodTracker':
        return <MoodTracker onBack={() => setCurrentFeature('moodMirror')} />;
      
      case 'loveLab':
        return renderBundleFeatures(bundles.find(b => b.id === 'loveLab')!);
      case 'loveDaily':
        return renderBundleFeatures(bundles.find(b => b.id === 'loveDaily')!);
      case 'lovePlayzone':
        return renderBundleFeatures(bundles.find(b => b.id === 'lovePlayzone')!);
      case 'moodMirror':
        return renderBundleFeatures(bundles.find(b => b.id === 'moodMirror')!);

      case 'help':
        return (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <button 
              onClick={() => setCurrentFeature('home')}
              className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
                Help & Support
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-5 h-5 text-pink-600" />
                      <h3 className="font-semibold text-purple-800">Contact Us</h3>
                    </div>
                    <p className="text-purple-700 mb-2">Email Support:</p>
                    <a href="mailto:Satvik20pandey@gmail.com" className="text-pink-600 hover:text-pink-500 transition-colors">
                      Satvik20pandey@gmail.com
                    </a>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-800">Phone Support</h3>
                    </div>
                    <p className="text-purple-700 mb-2">Contact Number:</p>
                    <p className="text-pink-600 font-medium">+91-7011373960</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">App Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-700">App Version: <span className="font-medium">1.0.0</span></p>
                      <p className="text-purple-700">Last Updated: <span className="font-medium">June 2025</span></p>
                    </div>
                    <div>
                      <p className="text-purple-700">Developer: <span className="font-medium">Satvik Appworks</span></p>
                      <p className="text-purple-700">Platform: <span className="font-medium">Web & Mobile</span></p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Legal & Privacy</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setCurrentFeature('privacy')}
                      className="flex items-center justify-between w-full p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-pink-600" />
                        <span className="text-purple-800 font-medium">Privacy Policy</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-600" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentFeature('terms')}
                      className="flex items-center justify-between w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-800 font-medium">Terms of Use</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Feedback</h3>
                  <p className="text-purple-700 mb-4">
                    We'd love to hear from you! Send us your feedback, suggestions, or report any issues.
                  </p>
                  <Button
                    onClick={() => window.open('mailto:Satvik20pandey@gmail.com?subject=HeartSync App Feedback', '_blank')}
                    variant="primary"
                    icon={<Mail size={18} />}
                  >
                    Send Feedback
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <button 
              onClick={() => setCurrentFeature('help')}
              className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Help & Support
            </button>
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
                Privacy Policy
              </h2>
              <div className="prose prose-purple max-w-none space-y-6 text-sm">
                <p className="text-purple-600 font-medium">Effective Date: June 2025</p>
                
                <div>
                  <p className="text-purple-800 leading-relaxed">
                    HeartSync ("we", "our", "us") respects your privacy and is committed to protecting your information. 
                    This Privacy Policy explains how we handle data when you use our app.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">1. Information We Collect</h3>
                  <div className="space-y-3 text-purple-700">
                    <p>We do not require users to create an account or submit any personal data to use the HeartSync app.</p>
                    <p><strong>Personal Information:</strong> We do not collect personal data. If you contact us via email (e.g., for support), we will only use your email address to respond to your query.</p>
                    <p><strong>Usage Data:</strong> We may collect limited, non-personally identifiable usage data (such as device type and general app usage patterns) to improve app performance. This data is anonymous and not linked to any individual.</p>
                    <p><strong>Mood & Relationship Data:</strong> All emotional and compatibility inputs (e.g., mood tracking, name compatibility, test results) are stored locally on your device and never transmitted or accessed by us.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">2. How We Use Your Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-700">
                    <li>To improve user experience and enhance app features.</li>
                    <li>To respond to inquiries when you voluntarily contact us.</li>
                    <li>For internal, anonymous analytics to improve app functionality (if implemented).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">3. Data Sharing and Disclosure</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-700">
                    <li>We do not sell, rent, or share user data with any third-party advertisers or services.</li>
                    <li>No personal data is transferred to third-party servers.</li>
                    <li>Local data remains private on your device.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">4. Data Security</h3>
                  <div className="space-y-3 text-purple-700">
                    <p>Your data is stored locally on your device.</p>
                    <p>We do not store user data on external servers.</p>
                    <p>You may clear your app data anytime via: Settings {'>'}  Apps {'>'} HeartSync {'>'} Storage {'>'} Clear Data.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">5. Your Rights</h3>
                  <ul className="list-disc list-inside space-y-2 text-purple-700">
                    <li>You may delete all data by clearing the app's storage through your device settings.</li>
                    <li>You may contact us at satvik20pandey@gmail.com with any questions or concerns.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">6. Children's Privacy</h3>
                  <p className="text-purple-700">HeartSync is not intended for children under the age of 13. We do not knowingly collect personal information from anyone under 13.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">7. Changes to This Policy</h3>
                  <p className="text-purple-700">
                    We may update this Privacy Policy periodically. Users will be notified of material changes within the app or via an update notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">8. Contact</h3>
                  <p className="text-purple-700">
                    If you have any questions about this Privacy Policy, please contact us at:{' '}
                    <a href="mailto:satvik20pandey@gmail.com" className="text-pink-600 hover:text-pink-500">
                      📧 satvik20pandey@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'terms':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <button 
              onClick={() => setCurrentFeature('help')}
              className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Help & Support
            </button>
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
                Terms of Use
              </h2>
              <div className="prose prose-purple max-w-none space-y-6 text-sm">
                <p className="text-purple-600 font-medium">Effective Date: June 2025</p>
                
                <div>
                  <p className="text-purple-700">
                    Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the HeartSync mobile application.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">1. Acceptance of Terms</h3>
                  <p className="text-purple-700">
                    By accessing or using the HeartSync app, you agree to be bound by these Terms. If you do not agree with any part of the terms, please do not use the app.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">2. License to Use</h3>
                  <p className="text-purple-700">
                    You are granted a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes in accordance with these Terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">3. Content and Features</h3>
                  <p className="text-purple-700">
                    HeartSync offers features such as love tests, compatibility analysis, mood tracking, games, and daily relationship tips. These features are for entertainment and self-reflection purposes only and do not constitute professional psychological or relationship advice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">4. Intellectual Property</h3>
                  <p className="text-purple-700">
                    All content, branding, designs, and features within the app are the intellectual property of HeartSync and are protected under copyright and trademark laws. You may not modify, copy, or redistribute any part of the app.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">5. Limitations of Liability</h3>
                  <p className="text-purple-700">
                    HeartSync and its developers shall not be liable for any damages arising out of the use or inability to use the app. The app is provided "as is" without warranties of any kind.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">6. Termination</h3>
                  <p className="text-purple-700">
                    We reserve the right to terminate or restrict access to the app at our sole discretion, without notice, if you violate these Terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">7. Changes to Terms</h3>
                  <p className="text-purple-700">
                    We may revise these Terms at any time. Continued use of the app after changes have been made constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">8. Contact Us</h3>
                  <p className="text-purple-700">
                    For any questions about these Terms, please contact:{' '}
                    <a href="mailto:satvik20pandey@gmail.com" className="text-pink-600 hover:text-pink-500">
                      📧 satvik20pandey@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display animate-fadeIn">
                HeartSync 💖
              </h1>
              <p className="text-lg text-purple-700 font-medium italic animate-fadeInUp">
                Where Hearts Connect & Love Grows
              </p>
            </header>
            
            {/* Love Facts Carousel */}
            <LoveFactsCarousel />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bundles.map((bundle) => (
                <Card 
                  key={bundle.id}
                  animated
                  className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setCurrentFeature(bundle.id as FeatureType)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center text-pink-500 bg-pink-100 rounded-full group-hover:scale-110 transition-transform">
                        {bundle.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-pink-600 font-display">
                        {bundle.title}
                      </h3>
                    </div>
                    
                    <p className="text-purple-700 mb-4">{bundle.description}</p>
                    
                    <div className="flex items-center text-pink-500 group-hover:text-pink-600 transition-colors">
                      <span className="text-sm font-medium">Explore features</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  const renderBundleFeatures = (bundle: Bundle) => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button 
          onClick={() => setCurrentFeature('home')}
          className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center text-pink-500 bg-pink-100 rounded-full mx-auto mb-4">
            {bundle.icon}
          </div>
          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
            {bundle.title}
          </h2>
          <p className="text-purple-700">{bundle.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bundle.features.map((feature) => (
            <Card
              key={feature.id}
              animated
              className="cursor-pointer group"
              onClick={() => setCurrentFeature(feature.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-pink-500 bg-pink-100 rounded-full group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-purple-600 text-sm">{feature.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-[env(safe-area-inset-top,0px)] z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => setCurrentFeature('home')}
            >
              <Heart className="w-6 h-6 text-pink-500 mr-2" fill="currentColor" />
              <span className="text-xl font-bold text-pink-600 font-display">HeartSync</span>
            </div>

            <button 
              onClick={() => setMenuOpen(true)}
              className="p-2 text-purple-600 hover:text-pink-500 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Menu Button for Android */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          onClick={() => setMenuOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Open menu"
        >
          <Menu size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Side Menu */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          ref={sideMenuRef}
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
              <span className="text-lg font-bold text-pink-600 font-display">HeartSync</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-2 text-purple-600 hover:text-pink-500 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="space-y-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentFeature(item.id as FeatureType);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-pink-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-pink-500 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="font-medium text-purple-800 group-hover:text-pink-600 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t">
              <div className="text-center text-sm text-purple-600">
                <p className="font-medium">HeartSync v1.0.0</p>
                <p className="text-xs mt-1">Made with 💖 by Satvik Appworks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto pb-20">
        {renderFeature()}
      </main>
    </div>
  );
};

export default Home;