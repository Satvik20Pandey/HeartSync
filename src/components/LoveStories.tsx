import { useState } from 'react';
import { ArrowLeft, Quote } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Props {
  onBack: () => void;
}

interface Story {
  id: number;
  title: string;
  content: string;
  source?: string;
}

interface Fact {
  id: number;
  content: string;
  source?: string;
}

const LoveStories = ({ onBack }: Props) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'facts'>('stories');
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      title: "High School Sweethearts Reunited",
      content: "After dating in high school, Michael and Emma went their separate ways to different colleges. Twenty years later, they both found themselves back in their hometown for a class reunion. The moment they saw each other, they felt the same spark. Now married for 5 years, they say those two decades apart gave them the growth they needed to truly appreciate what they had found in each other.",
      source: "Real Couples Magazine"
    },
    {
      id: 2,
      title: "Love Through Letters",
      content: "Before dating apps, James and Linda maintained a long-distance relationship through handwritten letters for three years while he served overseas. They saved every letter—over 300 in total. On their 50th wedding anniversary, their grandchildren surprised them by binding the letters into a beautiful book. They say reading those letters reminds them that true connection transcends physical distance.",
      source: "Senior Life Stories"
    },
    {
      id: 3,
      title: "Found in Translation",
      content: "Maria and Hiroshi met at an international conference where she was working as a translator. Though they spoke different native languages, they spent hours each day teaching each other phrases and expressions. They say building their own unique way of communicating created a deeper understanding than many couples who speak the same language have. Ten years later, they're raising bilingual children and still learning from each other daily.",
    },
    {
      id: 4,
      title: "Second Chance at Love",
      content: "After losing their respective spouses, neither Robert nor Patricia expected to find love again in their 70s. Meeting at a grief support group, they initially bonded over shared loss but gradually discovered joy in new experiences together. They married at 76 and 78, proving that the heart remains open to love at any age.",
      source: "Golden Years Journal"
    }
  ];

  const facts: Fact[] = [
    {
      id: 1,
      content: "Falling in love produces the same neurological effects as cocaine. Both experiences affect the same areas of the brain and trigger a similar chemical reaction."
    },
    {
      id: 2,
      content: "Couples who maintain a 5:1 ratio of positive to negative interactions tend to have the most stable and happy relationships, according to research by Dr. John Gottman."
    },
    {
      id: 3,
      content: "Looking into a loved one's eyes for 4 minutes can increase feelings of closeness and intimacy. This exercise has been shown to create vulnerability and connection even between strangers."
    },
    {
      id: 4,
      content: "The average person will spend approximately 20,160 minutes (or two weeks) of their life kissing. That's a lot of oxytocin!"
    },
    {
      id: 5,
      content: "Long-term couples often start to look alike over time. This happens because they tend to mimic each other's expressions, causing similar facial muscles to develop."
    },
    {
      id: 6,
      content: "People are more likely to fall in love with someone who lives or works nearby. This 'proximity effect' remains one of the strongest predictors of attraction."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-600 mb-6 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </button>

      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-display">
        Love Stories & Facts
      </h2>

      <div className="flex justify-center mb-6">
        <div className="flex rounded-full bg-pink-100 p-1">
          <button
            className={`py-2 px-6 rounded-full transition-colors ${
              activeTab === 'stories' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md' 
                : 'text-purple-700 hover:text-pink-600'
            }`}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
          <button
            className={`py-2 px-6 rounded-full transition-colors ${
              activeTab === 'facts' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md' 
                : 'text-purple-700 hover:text-pink-600'
            }`}
            onClick={() => setActiveTab('facts')}
          >
            Facts
          </button>
        </div>
      </div>

      {activeTab === 'stories' ? (
        <div className="space-y-4">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="px-2">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {story.title}
                </h3>
                
                <p className="text-purple-700">
                  {expandedStory === story.id 
                    ? story.content 
                    : `${story.content.substring(0, 150)}...`}
                </p>
                
                {story.source && (
                  <p className="text-sm text-purple-500 mt-2 italic">
                    Source: {story.source}
                  </p>
                )}
                
                <button
                  onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                  className="text-pink-500 hover:text-pink-600 text-sm font-medium mt-2"
                >
                  {expandedStory === story.id ? 'Show less' : 'Read more'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {facts.map((fact) => (
            <Card key={fact.id} className="flex items-start gap-4">
              <Quote className="text-pink-400 flex-shrink-0 mt-1" size={24} />
              
              <div>
                <p className="text-purple-700">{fact.content}</p>
                
                {fact.source && (
                  <p className="text-sm text-purple-500 mt-2 italic">
                    Source: {fact.source}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoveStories;