import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBookOpen, FiPlay, FiHeadphones, FiHeart, FiSun, FiMoon, FiLeaf, FiWind, 
  FiDroplet, FiZap, FiCoffee, FiHome, FiUser, FiUsers, FiClock, FiStar,
  FiDownload, FiExternalLink, FiFilter, FiSearch, FiVolume2, FiPause,
  FiSkipForward, FiSkipBack, FiRefreshCw, FiBookmark, FiShare2
} = FiIcons;

const Resources = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Comprehensive wellness resources
  const resources = [
    // Meditation Guides
    {
      id: 1,
      title: "5-Minute Morning Meditation",
      category: "meditation",
      type: "guide",
      duration: "5 minutes",
      difficulty: "beginner",
      description: "Start your day with peace and intention through this gentle morning meditation practice.",
      content: `
**5-Minute Morning Meditation**

**Preparation (30 seconds):**
• Find a comfortable seated position
• Close your eyes or soften your gaze
• Take three deep breaths to center yourself

**Body Awareness (1 minute):**
• Notice how your body feels in this moment
• Start from the top of your head and slowly scan down
• Release any tension you find with each exhale
• Feel your body settling into stillness

**Breath Focus (2 minutes):**
• Bring attention to your natural breath
• Don't change it, just observe
• When mind wanders, gently return to breath
• Count breaths: inhale (1), exhale (2), up to 10, then start over

**Intention Setting (1 minute):**
• Ask yourself: "How do I want to feel today?"
• Choose one word or phrase (peaceful, confident, grateful)
• Repeat this intention silently 3 times
• Feel it settling into your heart

**Gentle Return (30 seconds):**
• Wiggle fingers and toes
• Take a deeper breath
• Open eyes slowly
• Carry your intention into the day

**Tips for Success:**
• Practice at the same time each morning
• Start with just 3 minutes if 5 feels too long
• It's normal for the mind to wander - that's part of the practice
• Be patient and kind with yourself
      `,
      tags: ["morning", "beginners", "mindfulness", "intention"],
      benefits: ["Reduces stress", "Improves focus", "Sets positive tone for day"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Body Scan for Deep Relaxation",
      category: "meditation",
      type: "guide",
      duration: "15 minutes",
      difficulty: "intermediate",
      description: "Release physical tension and mental stress through systematic body awareness.",
      content: `
**Progressive Body Scan Meditation**

**Setup (1 minute):**
• Lie down comfortably on your back
• Arms at sides, palms facing up
• Legs slightly apart, feet falling naturally outward
• Close your eyes and take 5 deep breaths

**Starting the Scan (2 minutes):**
• Begin at the crown of your head
• Notice any sensations without trying to change them
• Imagine warm, golden light filling each area you focus on
• Breathe into each body part as you scan

**Head and Neck (2 minutes):**
• Forehead - release any furrows or tension
• Eyes - let them soften and sink back
• Jaw - allow it to drop slightly open
• Neck - feel it lengthen and relax

**Arms and Hands (2 minutes):**
• Shoulders - let them melt away from your ears
• Upper arms - feel them heavy against the floor
• Forearms and wrists - completely relaxed
• Hands and fingers - soft and open

**Torso (3 minutes):**
• Chest - feel it rise and fall naturally
• Heart area - send it gratitude and love
• Stomach - soft and relaxed
• Lower back - releasing into the support beneath you

**Legs and Feet (3 minutes):**
• Hips - feel them wide and grounded
• Thighs - heavy and relaxed
• Knees - soft and tension-free
• Calves, ankles, feet - completely at ease

**Whole Body Integration (2 minutes):**
• Scan your entire body as one unified whole
• Notice the feeling of complete relaxation
• Rest in this state of deep peace
• Set intention to carry this calm with you

**Benefits:**
• Reduces physical tension and pain
• Calms the nervous system
• Improves sleep quality
• Increases body awareness
      `,
      tags: ["relaxation", "sleep", "tension relief", "mindfulness"],
      benefits: ["Deep relaxation", "Better sleep", "Pain relief", "Stress reduction"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Loving-Kindness Meditation",
      category: "meditation",
      type: "guide",
      duration: "10 minutes",
      difficulty: "beginner",
      description: "Cultivate compassion and emotional healing through loving-kindness practice.",
      content: `
**Loving-Kindness Meditation**

**Preparation (1 minute):**
• Sit comfortably with spine straight
• Place hands on heart or in lap
• Close eyes and breathe naturally
• Set intention to cultivate love and compassion

**Self-Love (2 minutes):**
Repeat these phrases for yourself:
• "May I be happy"
• "May I be healthy"
• "May I be safe"
• "May I live with ease"
• "May I be free from suffering"

Feel the warmth of these wishes in your heart.

**Loved One (2 minutes):**
Bring to mind someone you love easily:
• "May you be happy"
• "May you be healthy"
• "May you be safe"
• "May you live with ease"
• "May you be free from suffering"

**Neutral Person (2 minutes):**
Think of someone neutral (cashier, neighbor):
• "May you be happy"
• "May you be healthy"
• "May you be safe"
• "May you live with ease"
• "May you be free from suffering"

**Difficult Person (2 minutes):**
Bring to mind someone challenging:
• "May you be happy"
• "May you be healthy"
• "May you be safe"
• "May you live with ease"
• "May you be free from suffering"

**All Beings (1 minute):**
Extend love to all living beings:
• "May all beings be happy"
• "May all beings be healthy"
• "May all beings be safe"
• "May all beings live with ease"
• "May all beings be free from suffering"

**Tips:**
• Start with easier categories if difficult person feels too challenging
• It's normal to feel resistance - just notice it with kindness
• The practice works even if you don't "feel" it initially
• Regular practice builds emotional resilience
      `,
      tags: ["compassion", "emotional healing", "relationships", "self-love"],
      benefits: ["Increases empathy", "Reduces anger", "Improves relationships", "Builds self-compassion"],
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&auto=format&fit=crop"
    },

    // Breathing Techniques
    {
      id: 4,
      title: "4-7-8 Breathing for Instant Calm",
      category: "breathing",
      type: "technique",
      duration: "3 minutes",
      difficulty: "beginner",
      description: "Powerful breathing technique to quickly reduce anxiety and promote relaxation.",
      content: `
**4-7-8 Breathing Technique**

**How It Works:**
This technique activates your parasympathetic nervous system, triggering your body's relaxation response. The longer exhale helps release tension and calm your mind.

**The Pattern:**
• Inhale for 4 counts
• Hold for 7 counts  
• Exhale for 8 counts

**Step-by-Step Instructions:**

**Preparation:**
• Sit comfortably with back straight
• Place tongue tip against roof of mouth, just behind front teeth
• Exhale completely through mouth, making a "whoosh" sound

**The Cycle (Repeat 4 times):**
1. Close mouth, inhale through nose for 4 counts
2. Hold breath for 7 counts
3. Exhale through mouth for 8 counts, making "whoosh" sound
4. This completes one cycle

**Important Notes:**
• Keep the ratio the same, but adjust speed if needed
• If 4-7-8 feels too long, try 2-3-4 or 3-5-6
• Practice twice daily for best results
• Never do more than 4 cycles when starting

**When to Use:**
• Before sleep to promote relaxation
• During anxiety or stress
• Before important meetings or events
• When feeling overwhelmed
• To transition between activities

**Benefits:**
• Reduces anxiety within minutes
• Lowers heart rate and blood pressure
• Improves sleep quality
• Increases focus and mental clarity
• Helps manage cravings and impulses

**Variations:**
• **Box Breathing:** 4-4-4-4 pattern
• **Triangle Breathing:** 4-4-4 pattern
• **Extended Exhale:** Any inhale with double-length exhale
      `,
      tags: ["anxiety relief", "sleep", "quick technique", "nervous system"],
      benefits: ["Instant calm", "Reduces anxiety", "Better sleep", "Lowers blood pressure"],
      image: "https://images.unsplash.com/photo-1506252374453-ef5237291d83?w=400&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Coherent Breathing for Balance",
      category: "breathing",
      type: "technique",
      duration: "10 minutes",
      difficulty: "intermediate",
      description: "Balanced breathing pattern to optimize heart rate variability and nervous system function.",
      content: `
**Coherent Breathing (5-5 Pattern)**

**What is Coherent Breathing?**
A breathing pattern of 5 seconds in, 5 seconds out, creating about 6 breaths per minute. This optimal rate maximizes heart rate variability and promotes physiological coherence.

**Scientific Benefits:**
• Optimizes autonomic nervous system balance
• Improves heart rate variability
• Enhances emotional regulation
• Increases mental clarity and focus
• Reduces stress hormones

**Basic Technique:**

**Setup (1 minute):**
• Sit or lie comfortably
• One hand on chest, one on belly
• Breathe naturally and observe your rhythm
• Close eyes or soften gaze

**Finding Your Rhythm (2 minutes):**
• Inhale slowly for 5 counts
• Exhale slowly for 5 counts
• Focus on smooth, even breaths
• Belly should rise and fall more than chest

**Deepening the Practice (7 minutes):**
• Continue 5-5 pattern
• Make breaths smooth and effortless
• If mind wanders, return to counting
• Notice sense of calm and balance developing

**Advanced Variations:**

**With Visualization:**
• Imagine breathing in peace, exhaling tension
• Visualize golden light entering on inhale
• See stress leaving as gray smoke on exhale

**With Heart Focus:**
• Place both hands on heart
• Breathe in and out through heart area
• Cultivate feelings of gratitude or appreciation

**With Mantra:**
• Inhale: "I am calm"
• Exhale: "I am peaceful"
• Or any phrase that resonates with you

**Daily Practice Schedule:**
• Morning: 5 minutes to start day centered
• Midday: 3 minutes to reset and refocus
• Evening: 10 minutes to unwind and relax
• Before sleep: 5 minutes to prepare for rest

**Troubleshooting:**
• If feeling dizzy: slow down or take break
• If 5 counts feel too long: start with 3-3 or 4-4
• If mind is very busy: count "1-2-3-4-5" instead of just "5"
• If falling asleep: sit up straighter or open eyes slightly
      `,
      tags: ["balance", "heart rate variability", "focus", "nervous system"],
      benefits: ["Nervous system balance", "Improved focus", "Emotional regulation", "Heart health"],
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&auto=format&fit=crop"
    },

    // Stress Management
    {
      id: 6,
      title: "The STOP Technique for Stress",
      category: "stress-management",
      type: "technique",
      duration: "1 minute",
      difficulty: "beginner",
      description: "Quick mindfulness technique to interrupt stress and create space for wise response.",
      content: `
**The STOP Technique**

A simple but powerful mindfulness tool you can use anywhere, anytime you feel stressed, overwhelmed, or reactive.

**S - STOP**
• Pause whatever you're doing
• Put down your phone, step back from computer
• Create a moment of stillness
• This breaks the automatic stress reaction

**T - TAKE A BREATH**
• Take one deep, conscious breath
• Or three deep breaths if you have time
• Feel your feet on the ground
• Notice you're breathing

**O - OBSERVE**
• What's happening right now?
• What am I thinking?
• What am I feeling in my body?
• What emotions are present?
• Just notice without judging

**P - PROCEED**
• How do I want to respond?
• What would be most helpful right now?
• What aligns with my values?
• Move forward with awareness and intention

**Examples of When to Use STOP:**

**At Work:**
• Before responding to difficult email
• When feeling overwhelmed by tasks
• During tense meetings or conversations
• When technology isn't working

**At Home:**
• When children are being challenging
• During arguments with partner
• When feeling rushed or frantic
• Before making important decisions

**In Daily Life:**
• In traffic or long lines
• When receiving bad news
• Before social media scrolling
• When feeling anxious or worried

**Extended STOP Practice:**

**STOP + SMILE:**
• Add a gentle smile after observing
• Softens the whole experience
• Activates positive neural pathways

**STOP + GRATITUDE:**
• After observing, find one thing to appreciate
• Could be as simple as "I can breathe"
• Shifts perspective from problem to possibility

**STOP + SELF-COMPASSION:**
• Place hand on heart
• Say "This is a moment of difficulty"
• "Difficulty is part of life"
• "May I be kind to myself"

**Making it a Habit:**
• Set phone reminders throughout day
• Use transitions as cues (doorways, red lights)
• Practice during routine activities
• Start with just once per day and build up
      `,
      tags: ["mindfulness", "quick technique", "workplace", "emergency tool"],
      benefits: ["Interrupts stress", "Increases awareness", "Better responses", "Emotional regulation"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Progressive Muscle Relaxation",
      category: "stress-management",
      type: "technique",
      duration: "20 minutes",
      difficulty: "beginner",
      description: "Systematic tension and release technique to achieve deep physical and mental relaxation.",
      content: `
**Progressive Muscle Relaxation (PMR)**

**What is PMR?**
A technique that involves systematically tensing and then relaxing different muscle groups. This helps you learn to recognize tension and consciously release it.

**Benefits:**
• Reduces physical tension and pain
• Lowers anxiety and stress
• Improves sleep quality
• Increases body awareness
• Helps with chronic pain management

**Preparation (2 minutes):**
• Find quiet, comfortable space
• Wear loose, comfortable clothing
• Lie down or sit in supportive chair
• Remove glasses, shoes, tight clothing
• Take 5 deep breaths to settle in

**The Process:**
For each muscle group:
1. Tense the muscles for 5-7 seconds
2. Notice the feeling of tension
3. Release suddenly and completely
4. Notice the contrast and relaxation for 10-15 seconds
5. Take a deep breath before moving to next group

**Muscle Group Sequence:**

**Hands and Arms (3 minutes):**
• Make fists - tense, then release
• Bend wrists up - tense, then release
• Tense biceps by bending arms - release
• Extend arms out straight - tense, release

**Face and Neck (3 minutes):**
• Wrinkle forehead - tense, release
• Squeeze eyes shut tight - release
• Clench jaw and bite down - release
• Press tongue to roof of mouth - release
• Tense neck by pulling chin to chest - release

**Shoulders and Back (3 minutes):**
• Raise shoulders to ears - tense, release
• Arch back slightly - tense, release
• Squeeze shoulder blades together - release

**Chest and Stomach (2 minutes):**
• Take deep breath and hold - release
• Tense stomach muscles - release
• Arch back and push stomach out - release

**Hips and Legs (4 minutes):**
• Tense buttocks - squeeze, release
• Tense thighs by pressing knees together - release
• Point toes down (calves) - tense, release
• Flex feet up (shins) - tense, release
• Curl toes - tense, release

**Whole Body Integration (3 minutes):**
• Tense entire body at once for 5 seconds
• Release everything completely
• Lie still and notice total relaxation
• Scan body from head to toe
• Enjoy the feeling of complete relaxation

**Quick PMR (5 minutes):**
When time is limited, focus on these key areas:
1. Hands (make fists)
2. Face (scrunch everything)
3. Shoulders (raise to ears)
4. Stomach (tense abs)
5. Legs (point toes)

**Tips for Success:**
• Don't tense too hard - 70% effort is enough
• If you have injuries, skip those areas
• Practice regularly for best results
• Use before bed for better sleep
• Can be done sitting in office chair
      `,
      tags: ["tension relief", "sleep", "physical relaxation", "body awareness"],
      benefits: ["Releases tension", "Improves sleep", "Reduces anxiety", "Body awareness"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop"
    },

    // Relaxation Recipes
    {
      id: 8,
      title: "Calming Chamomile Moon Milk",
      category: "recipes",
      type: "recipe",
      duration: "10 minutes",
      difficulty: "beginner",
      description: "Soothing bedtime drink with adaptogenic herbs to promote deep, restful sleep.",
      content: `
**Calming Chamomile Moon Milk**

**What is Moon Milk?**
An ancient Ayurvedic remedy - a warm, spiced milk drink designed to calm the nervous system and prepare the body for restful sleep.

**Ingredients:**
• 1 cup milk of choice (oat, almond, or dairy)
• 1 tsp dried chamomile flowers (or 1 chamomile tea bag)
• 1/2 tsp ashwagandha powder (optional)
• 1/4 tsp turmeric powder
• Pinch of ground ginger
• Pinch of cinnamon
• 1 tsp honey or maple syrup
• 1/4 tsp vanilla extract
• Pinch of black pepper (helps turmeric absorption)

**Instructions:**

**Step 1: Prepare the Base**
• Heat milk in small saucepan over medium-low heat
• Don't let it boil - just warm until steaming
• If using tea bag, steep for 3-4 minutes, then remove

**Step 2: Add Spices**
• Whisk in chamomile, ashwagandha, turmeric, ginger, cinnamon
• Whisk continuously to prevent clumping
• Simmer gently for 2-3 minutes

**Step 3: Strain and Sweeten**
• Strain through fine mesh strainer if using loose herbs
• Stir in honey and vanilla
• Add pinch of black pepper

**Step 4: Serve Mindfully**
• Pour into favorite mug
• Sip slowly while doing gentle stretches or reading
• Drink 30-60 minutes before bedtime

**Variations:**

**Lavender Dreams:**
• Replace chamomile with 1/2 tsp dried lavender
• Add 1/4 tsp magnesium powder
• Perfect for anxiety relief

**Golden Milk Classic:**
• Focus on turmeric and ginger
• Add 1/4 tsp cardamom
• Great for inflammation

**Chocolate Comfort:**
• Add 1 tbsp cacao powder
• Include 1/4 tsp maca powder
• Perfect for stress relief

**Rose Petal Serenity:**
• Add 1 tsp dried rose petals
• Include 1/4 tsp rose water
• Beautiful for emotional balance

**Benefits of Key Ingredients:**

**Chamomile:**
• Natural sedative properties
• Reduces anxiety and promotes calm
• Anti-inflammatory

**Ashwagandha:**
• Adaptogenic herb that reduces cortisol
• Helps body manage stress
• Improves sleep quality

**Turmeric:**
• Powerful anti-inflammatory
• Supports brain health
• May improve mood

**Tips:**
• Make a larger batch and store in fridge for 3 days
• Warm gently when ready to drink
• Add collagen powder for extra protein
• Try different milk alternatives to find your favorite
• Make it a nightly ritual for best results
      `,
      tags: ["sleep", "herbal", "anti-inflammatory", "bedtime ritual"],
      benefits: ["Better sleep", "Reduces anxiety", "Anti-inflammatory", "Calming ritual"],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Stress-Relief Herbal Tea Blend",
      category: "recipes",
      type: "recipe",
      duration: "5 minutes",
      difficulty: "beginner",
      description: "Custom herbal tea blend to naturally reduce stress and promote emotional balance.",
      content: `
**Stress-Relief Herbal Tea Blend**

**The Perfect Stress-Busting Blend:**

**Base Blend Recipe (Makes 10 servings):**
• 2 tbsp dried chamomile flowers
• 1 tbsp dried lemon balm
• 1 tbsp dried peppermint leaves
• 1 tsp dried lavender buds
• 1 tsp dried passionflower
• 1/2 tsp dried holy basil (tulsi)
• 1/2 tsp dried rose petals

**Individual Serving:**
• 1 tsp of blend per cup of hot water
• Steep 5-7 minutes
• Strain and enjoy

**Brewing Instructions:**

**Hot Tea:**
1. Boil water and let cool for 1 minute (200°F ideal)
2. Add 1 tsp blend to tea strainer or infuser
3. Pour hot water over herbs
4. Cover and steep 5-7 minutes
5. Strain and add honey if desired

**Iced Tea:**
1. Make concentrated hot tea (double the herbs)
2. Let cool to room temperature
3. Pour over ice and add fresh mint
4. Perfect for hot summer days

**Cold Brew:**
1. Add 2 tsp blend to 1 cup cold water
2. Refrigerate 6-8 hours or overnight
3. Strain and enjoy over ice
4. Gentler extraction, less bitter

**Benefits of Each Herb:**

**Chamomile:**
• Gentle nervine that calms anxiety
• Helps with sleep and digestion
• Anti-inflammatory properties

**Lemon Balm:**
• Reduces stress and improves mood
• Natural antiviral properties
• Helps with focus and mental clarity

**Peppermint:**
• Cooling and refreshing
• Aids digestion and reduces nausea
• Natural decongestant

**Lavender:**
• Powerful relaxant and mood balancer
• Reduces anxiety and promotes sleep
• Natural antiseptic

**Passionflower:**
• Traditional remedy for anxiety
• Helps quiet racing thoughts
• Supports nervous system health

**Holy Basil (Tulsi):**
• Adaptogenic herb that manages stress
• Supports immune system
• Balances cortisol levels

**Rose Petals:**
• Heart-opening and emotionally soothing
• Rich in vitamin C
• Adds beautiful floral notes

**Custom Blends for Different Needs:**

**For Anxiety:**
• Increase chamomile and passionflower
• Add 1/2 tsp skullcap
• Reduce peppermint

**For Sleep:**
• Double the lavender
• Add 1/2 tsp valerian root
• Include 1/2 tsp California poppy

**For Energy + Calm:**
• Add 1/2 tsp green tea
• Include 1/2 tsp ginkgo
• Increase holy basil

**For Digestive Stress:**
• Increase peppermint and chamomile
• Add 1/2 tsp fennel seeds
• Include 1/2 tsp ginger

**Storage and Preparation Tips:**
• Store blend in airtight glass jar
• Keep in cool, dark place
• Use within 1 year for best potency
• Label with date and ingredients
• Make small batches to maintain freshness

**When to Drink:**
• Morning: for calm energy to start day
• Afternoon: instead of coffee for stress relief
• Evening: 1 hour before bed for relaxation
• During stressful moments: as needed for quick calm
      `,
      tags: ["herbal", "stress relief", "natural", "customizable"],
      benefits: ["Natural stress relief", "Improves mood", "Better sleep", "Digestive support"],
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop"
    },
    {
      id: 10,
      title: "Grounding Smoothie Bowl",
      category: "recipes",
      type: "recipe",
      duration: "15 minutes",
      difficulty: "intermediate",
      description: "Nutrient-dense smoothie bowl with adaptogens and superfoods to support stress resilience.",
      content: `
**Grounding Smoothie Bowl**

**Why This Bowl Works:**
Combines stress-fighting nutrients, adaptogens, and grounding foods to nourish your nervous system and provide sustained energy.

**Base Smoothie Ingredients:**
• 1 frozen banana
• 1/2 cup frozen blueberries
• 1/2 avocado (for creaminess and healthy fats)
• 1 cup coconut milk (canned for richness)
• 1 tbsp almond butter
• 1 tsp maca powder (adaptogen for energy)
• 1/2 tsp ashwagandha powder (stress relief)
• 1 tbsp chia seeds
• 1 tsp vanilla extract
• 1 cup ice

**Toppings (Choose 3-5):**
• Fresh berries (antioxidants)
• Sliced banana (potassium for nervous system)
• Granola or nuts (healthy fats and protein)
• Coconut flakes (medium-chain fatty acids)
• Cacao nibs (natural mood booster)
• Hemp hearts (omega-3s and protein)
• Bee pollen (B vitamins and energy)
• Edible flowers (beauty and joy)

**Instructions:**

**Step 1: Prepare Base**
• Add all smoothie ingredients to high-speed blender
• Blend until thick and creamy (like soft-serve ice cream)
• Add more liquid if too thick, more frozen fruit if too thin

**Step 2: Create Your Bowl**
• Pour smoothie into chilled bowl
• Use spoon to create smooth, even surface
• Work quickly before it melts

**Step 3: Artistic Toppings**
• Arrange toppings in sections or patterns
• Take a photo if it brings you joy!
• Eat mindfully and slowly

**Adaptogen Boost Options:**

**For Stress Relief:**
• Add 1/2 tsp reishi mushroom powder
• Include 1/4 tsp rhodiola
• Top with walnuts (omega-3s)

**For Energy + Focus:**
• Add 1/2 tsp cordyceps mushroom
• Include 1 tsp matcha powder
• Top with pumpkin seeds (magnesium)

**For Hormonal Balance:**
• Add 1 tbsp ground flaxseed
• Include 1/2 tsp schisandra berry powder
• Top with sunflower seeds

**Seasonal Variations:**

**Spring Renewal:**
• Base: spinach, pineapple, coconut
• Toppings: kiwi, mint, coconut flakes

**Summer Cooling:**
• Base: cucumber, mint, lime, coconut water
• Toppings: fresh berries, basil, lime zest

**Fall Grounding:**
• Base: pumpkin puree, banana, cinnamon, nutmeg
• Toppings: pecans, pumpkin seeds, cinnamon

**Winter Warming:**
• Base: cacao, banana, almond butter, cinnamon
• Toppings: goji berries, cacao nibs, almonds

**Nutritional Benefits:**

**Healthy Fats (Avocado, Nuts, Seeds):**
• Support brain health and hormone production
• Provide sustained energy
• Help absorb fat-soluble vitamins

**Antioxidants (Berries, Cacao):**
• Fight inflammation and oxidative stress
• Support mood and cognitive function
• Protect against cellular damage

**Adaptogens (Maca, Ashwagandha):**
• Help body adapt to stress
• Balance hormones naturally
• Support energy without jitters

**Fiber (Chia, Fruits, Vegetables):**
• Supports digestive health
• Helps stabilize blood sugar
• Promotes feelings of fullness

**Tips for Success:**
• Prep ingredients night before
• Freeze bananas in chunks for easier blending
• Start with less liquid - you can always add more
• Make it a mindful eating experience
• Experiment with flavors and find your favorites
• Take time to appreciate the colors and textures
      `,
      tags: ["nutrition", "adaptogens", "energy", "mindful eating"],
      benefits: ["Sustained energy", "Stress resilience", "Nutrient-dense", "Mood support"],
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&auto=format&fit=crop"
    },

    // Mindfulness Exercises
    {
      id: 11,
      title: "5-4-3-2-1 Grounding Technique",
      category: "mindfulness",
      type: "exercise",
      duration: "3 minutes",
      difficulty: "beginner",
      description: "Quick sensory grounding exercise to bring you into the present moment during anxiety or overwhelm.",
      content: `
**5-4-3-2-1 Grounding Technique**

**What is Grounding?**
Grounding techniques help you stay connected to the present moment when you feel anxious, overwhelmed, or dissociated. This technique uses your five senses to anchor you in the here and now.

**When to Use:**
• During panic attacks or high anxiety
• When feeling overwhelmed or stressed
• If you're ruminating or stuck in worried thoughts
• During emotional overwhelm
• Before important events or meetings
• Anytime you need to center yourself

**The Technique:**

**5 - THINGS YOU CAN SEE**
Look around and identify 5 things you can see:
• Notice colors, shapes, textures
• Look for details you hadn't noticed before
• Name them silently or out loud
• Examples: "Blue coffee mug, green plant, wooden desk, white wall, silver pen"

**4 - THINGS YOU CAN TOUCH**
Identify 4 things you can physically touch:
• Feel different textures and temperatures
• Notice hard, soft, smooth, rough surfaces
• Examples: "Smooth phone screen, soft fabric of my shirt, cool metal of my bracelet, rough texture of this wall"

**3 - THINGS YOU CAN HEAR**
Listen for 3 different sounds:
• Include both obvious and subtle sounds
• Near and far sounds
• Examples: "Air conditioning humming, birds chirping outside, sound of my own breathing"

**2 - THINGS YOU CAN SMELL**
Notice 2 different scents:
• Take a gentle sniff to identify smells
• Can be pleasant or neutral
• Examples: "Coffee brewing, fresh air from the window"

**1 - THING YOU CAN TASTE**
Identify 1 thing you can taste:
• Current taste in your mouth
• Can take a sip of water or chew gum if helpful
• Example: "Minty taste from my toothpaste, or neutral taste in my mouth"

**Advanced Variations:**

**Gratitude Grounding:**
After each sense, add something you're grateful for:
• "I see the sunset, and I'm grateful for this beautiful day"
• "I hear music, and I'm grateful for the gift of sound"

**Affirmation Grounding:**
Combine with positive affirmations:
• "I see my hands, and they are capable and strong"
• "I hear my breath, and I am alive and present"

**Color Grounding:**
Focus on one color and find 5 things in that color, then 4 in another color, etc.

**Body Awareness Addition:**
After the 5 senses, add:
• Notice your feet on the ground
• Feel your back against the chair
• Sense your clothes on your skin

**Tips for Maximum Effectiveness:**

**Slow Down:**
• Take your time with each sense
• Don't rush through the exercise
• Let yourself really notice and experience each sensation

**Be Curious:**
• Approach with beginner's mind
• Notice things as if seeing/hearing/feeling them for first time
• Stay curious rather than judgmental

**Adapt as Needed:**
• If you can't find enough of one sense, that's okay
• Focus more on the senses that are available to you
• Make it work for your current environment

**Practice Regularly:**
• Try it when you're calm so it's easier when stressed
• Use during daily activities like walking or eating
• The more you practice, the more automatic it becomes

**For Different Environments:**

**At Home:**
• Notice familiar objects with fresh eyes
• Include sounds from other rooms or outside
• Use kitchen scents or household items

**At Work:**
• Be discreet - can be done silently at desk
• Use office supplies and environment
• Include sounds of keyboards, conversations, air systems

**In Nature:**
• Rich sensory environment
• Notice natural textures, sounds, smells
• Can be especially calming and grounding

**In Public:**
• Practice people-watching mindfully
• Notice architecture and surroundings
• Use ambient sounds and general environment
      `,
      tags: ["grounding", "anxiety relief", "present moment", "sensory"],
      benefits: ["Reduces anxiety", "Increases presence", "Calms nervous system", "Stops rumination"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop"
    },

    // Sleep & Relaxation
    {
      id: 12,
      title: "Creating the Perfect Sleep Sanctuary",
      category: "sleep",
      type: "guide",
      duration: "30 minutes setup",
      difficulty: "beginner",
      description: "Complete guide to optimizing your bedroom environment for deep, restorative sleep.",
      content: `
**Creating Your Sleep Sanctuary**

**Why Your Environment Matters:**
Your bedroom environment has a profound impact on sleep quality. Small changes can lead to dramatically better rest and recovery.

**Temperature Control:**

**Optimal Range:** 65-68°F (18-20°C)
• Cool temperatures signal sleep time to your brain
• Use fans, AC, or open windows for air circulation
• Layer blankets so you can adjust during night
• Consider cooling mattress pad or pillow

**Humidity:** 30-50%
• Too dry can cause congestion and dry throat
• Too humid can feel uncomfortable and promote allergens
• Use humidifier or dehumidifier as needed

**Light Management:**

**Darkness is Key:**
• Use blackout curtains or shades
• Cover or remove LED lights from electronics
• Use eye mask if complete darkness isn't possible
• Consider red-light night lights for bathroom trips

**Morning Light:**
• Open curtains upon waking to signal day time
• Use sunrise alarm clock that gradually increases light
• Get natural sunlight within first hour of waking

**Sound Environment:**

**Reduce Disruptive Noise:**
• Use white noise machine or app
• Try earplugs if partner snores or outside noise is issue
• Heavy curtains can help muffle outside sounds
• Move ticking clocks out of bedroom

**Calming Sounds:**
• Nature sounds (rain, ocean, forest)
• Binaural beats designed for sleep
• Soft instrumental music
• Complete silence if preferred

**Bedroom Setup:**

**Bed and Bedding:**
• Invest in quality mattress suited to your sleep style
• Replace pillows every 1-2 years
• Use breathable, natural fiber sheets (cotton, bamboo, linen)
• Layer blankets for easy temperature adjustment

**Air Quality:**
• Keep bedroom well-ventilated
• Add air-purifying plants (snake plant, spider plant)
• Use air purifier if needed for allergies
• Change HVAC filters regularly

**Clutter-Free Space:**
• Keep bedroom clean and organized
• Remove work materials and exercise equipment
• Create calm, peaceful visual environment
• Use bedroom only for sleep and intimacy

**Technology Guidelines:**

**The 1-Hour Rule:**
• No screens 1 hour before intended sleep time
• This includes phones, tablets, TV, computers
• Blue light interferes with melatonin production

**Bedroom Tech Setup:**
• Charge devices outside bedroom if possible
• Use analog alarm clock instead of phone
• If phone must be in room, keep in airplane mode
• Consider blue light blocking glasses for evening screen use

**Aromatherapy for Sleep:**

**Essential Oils:**
• Lavender: most researched for sleep benefits
• Chamomile: calming and soothing
• Bergamot: reduces anxiety and promotes relaxation
• Sandalwood: grounding and peaceful

**Application Methods:**
• Diffuser with timer (30-60 minutes before sleep)
• Pillow spray with diluted oils
• Bath with 5-10 drops of oil
• Topical application (properly diluted) on wrists or temples

**Pre-Sleep Routine Setup:**

**Create Ritual Space:**
• Comfortable chair for reading or journaling
• Soft lighting (lamps instead of overhead lights)
• Keep books, journal, herbal tea nearby
• Set up everything needed for morning to reduce stress

**Progressive Relaxation Setup:**
• Yoga mat or comfortable floor space
• Guided meditation app or recordings ready
• Comfortable clothes for stretching or movement

**Wind-Down Activities:**
• Reading (physical books preferred over e-readers)
• Gentle journaling or gratitude practice
• Light stretching or restorative yoga
• Herbal tea or warm milk
• Progressive muscle relaxation

**Troubleshooting Common Issues:**

**Partner Sleep Differences:**
• Separate blankets to avoid temperature conflicts
• White noise to mask different sleep sounds
• Eye masks and earplugs for different schedules
• Mattress with good motion isolation

**Small Space Solutions:**
• Room dividers to separate sleep area
• Blackout window film instead of curtains
• Compact air purifier and white noise machine
• Multi-functional furniture for storage

**Budget-Friendly Options:**
• DIY blackout curtains with fabric and clips
• Box fan for white noise and cooling
• Homemade pillow spray with essential oils
• Decluttering and cleaning (free but effective!)

**Seasonal Adjustments:**

**Summer:**
• Cooling mattress pad or pillow
• Lightweight, breathable bedding
• Fan positioned for optimal air circulation
• Earlier wind-down routine due to longer daylight

**Winter:**
• Warm but breathable layers
• Humidifier for dry indoor air
• Light therapy lamp for morning routine
• Ensure adequate ventilation despite closed windows

**Weekly Maintenance:**
• Wash sheets in hot water weekly
• Vacuum mattress monthly
• Rotate and flip mattress seasonally
• Clean air purifier filters regularly
• Assess and adjust setup based on sleep quality
      `,
      tags: ["sleep hygiene", "environment", "bedroom setup", "sleep quality"],
      benefits: ["Better sleep quality", "Deeper rest", "Faster sleep onset", "More energy"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop"
    },

    // Audio Guides (Simulated)
    {
      id: 13,
      title: "10-Minute Guided Body Scan",
      category: "audio",
      type: "audio-guide",
      duration: "10 minutes",
      difficulty: "beginner",
      description: "Soothing guided audio experience for deep relaxation and tension release.",
      content: `
**10-Minute Guided Body Scan Audio**

*[This would be an audio file in a real application. Here's the script for reference]*

**Script Overview:**
A gentle, guided body scan meditation designed to help you release physical tension and mental stress through systematic awareness and relaxation.

**Audio Guide Script:**

**Introduction (1 minute):**
"Welcome to this 10-minute body scan meditation. Find a comfortable position lying down, with your arms at your sides and legs slightly apart. Allow your eyes to close gently, and take three deep breaths with me... 

Inhale deeply through your nose... and exhale slowly through your mouth. Again, breathe in... and breathe out. One more time, inhale... and let go completely as you exhale.

Now allow your breathing to return to its natural rhythm. There's nothing you need to do except listen to my voice and follow along."

**Head and Neck (2 minutes):**
"Let's begin at the very top of your head. Bring your attention to your scalp... notice any sensations there... perhaps tingling, warmth, or simply the absence of sensation. That's all perfectly normal.

Now move your attention to your forehead. If you notice any tension here, simply acknowledge it without trying to change anything. Move to your eyes... let them soften and sink back into your head. Your jaw... allow it to drop slightly open, releasing any clenching or holding.

Feel your neck... long and supported. If there's tension here, just breathe into it and imagine it melting away like warm butter."

**Arms and Hands (2 minutes):**
"Shift your attention to your shoulders. These often carry the weight of our daily stress. Just notice what's there... and imagine breathing into your shoulders, allowing them to soften and melt away from your ears.

Move down to your upper arms... your elbows... forearms... and into your hands. Notice your palms, the backs of your hands, each finger. You might feel tingling, warmth, or heaviness. All of these sensations are signs that you're relaxing deeply."

**Torso (2.5 minutes):**
"Bring your attention to your chest. Feel it rising and falling with each natural breath. Place your attention on your heart... and send it a message of gratitude for beating faithfully, day and night, without you having to think about it.

Move to your upper back, middle back, and lower back. If you notice any areas of tension or discomfort, simply breathe into them with compassion. You don't need to fix or change anything, just acknowledge what's there.

Now your abdomen... your stomach... your lower belly. Let this whole area soften and relax. Feel supported by whatever you're lying on."

**Legs and Feet (2 minutes):**
"Move your attention down to your hips... your upper legs... your knees. Feel the weight of your legs sinking into the surface beneath you.

Your calves... your ankles... and finally your feet. Notice your heels, the arches of your feet, your toes. Let everything be completely relaxed and heavy."

**Whole Body Integration (0.5 minutes):**
"Now take a moment to feel your entire body as one complete, relaxed whole. Scan from the top of your head all the way down to your toes... noticing the overall sense of relaxation and peace.

You are completely supported, completely safe, and completely relaxed."

**Closing:**
"In a moment, I'll invite you to begin returning to normal waking consciousness. But first, take a moment to appreciate this feeling of deep relaxation. Know that you can return to this peaceful state anytime you need it.

Now, begin to wiggle your fingers and toes... take a deeper breath... and when you're ready, gently open your eyes. Take your time returning to your day, carrying this sense of peace with you."

**Benefits of This Practice:**
• Releases physical tension throughout the body
• Calms the nervous system
• Improves body awareness
• Reduces stress and anxiety
• Can improve sleep quality when practiced before bed

**Tips for Best Experience:**
• Use headphones or earbuds for better sound quality
• Practice in a quiet, comfortable environment
• Don't worry if your mind wanders - just gently return attention to the voice
• Regular practice increases the benefits
• Can be done anytime you need to relax and reset
      `,
      tags: ["guided meditation", "body scan", "audio", "relaxation"],
      benefits: ["Deep relaxation", "Tension release", "Better body awareness", "Stress relief"],
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&auto=format&fit=crop",
      audioLength: "10:00",
      hasAudio: true
    }
  ];

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Resources', count: resources.length, icon: FiBookOpen },
    { value: 'meditation', label: 'Meditation', count: resources.filter(r => r.category === 'meditation').length, icon: FiUser },
    { value: 'breathing', label: 'Breathing', count: resources.filter(r => r.category === 'breathing').length, icon: FiWind },
    { value: 'stress-management', label: 'Stress Management', count: resources.filter(r => r.category === 'stress-management').length, icon: FiZap },
    { value: 'recipes', label: 'Wellness Recipes', count: resources.filter(r => r.category === 'recipes').length, icon: FiCoffee },
    { value: 'mindfulness', label: 'Mindfulness', count: resources.filter(r => r.category === 'mindfulness').length, icon: FiSun },
    { value: 'sleep', label: 'Sleep & Rest', count: resources.filter(r => r.category === 'sleep').length, icon: FiMoon },
    { value: 'audio', label: 'Audio Guides', count: resources.filter(r => r.category === 'audio').length, icon: FiHeadphones }
  ];

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'meditation': 'from-purple-500 to-indigo-500',
      'breathing': 'from-blue-500 to-cyan-500',
      'stress-management': 'from-red-500 to-pink-500',
      'recipes': 'from-green-500 to-teal-500',
      'mindfulness': 'from-orange-500 to-yellow-500',
      'sleep': 'from-indigo-500 to-purple-500',
      'audio': 'from-pink-500 to-rose-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleBackToResources = () => {
    setSelectedResource(null);
  };

  // Simulated audio player functions
  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // In real app, would control actual audio playback
  };

  if (selectedResource) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Resource Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToResources}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
            <span>Back to Resources</span>
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
              title="Bookmark"
            >
              <SafeIcon icon={FiBookmark} className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
              title="Share"
            >
              <SafeIcon icon={FiShare2} className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Resource Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={selectedResource.image} 
              alt={selectedResource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(selectedResource.category)}`}>
                  {selectedResource.category.charAt(0).toUpperCase() + selectedResource.category.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedResource.difficulty)}`}>
                  {selectedResource.difficulty}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedResource.title}</h1>
              <p className="text-lg opacity-90 mb-2">{selectedResource.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span>{selectedResource.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiStar} className="w-4 h-4" />
                  <span>{selectedResource.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Player (if audio resource) */}
          {selectedResource.hasAudio && (
            <div className={`p-4 border-b ${isDark ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlayAudio}
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full text-white"
                  >
                    <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-6 h-6" />
                  </motion.button>
                  <div>
                    <p className="font-medium">Guided Audio Experience</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedResource.audioLength}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiSkipBack} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary-500" />
                  <SafeIcon icon={FiSkipForward} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary-500" />
                  <SafeIcon icon={FiVolume2} className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Benefits */}
            {selectedResource.benefits && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.benefits.map((benefit, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="prose max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap leading-relaxed">
                {selectedResource.content}
              </div>
            </div>

            {/* Tags */}
            {selectedResource.tags && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResource.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resources
              .filter(r => r.id !== selectedResource.id && r.category === selectedResource.category)
              .slice(0, 2)
              .map(resource => (
                <motion.div
                  key={resource.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedResource(resource)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${isDark ? 'bg-gray-800 border border-gray-700 hover:border-primary-500' : 'bg-white border border-gray-200 hover:border-primary-300'} shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <SafeIcon icon={FiClock} className="w-3 h-3" />
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full mb-4"
        >
          <SafeIcon icon={FiLeaf} className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Wellness Resources</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover guided meditations, breathing techniques, stress management tools, wellness recipes, and relaxation resources to support your mental health journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search resources by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2 justify-center mb-6"
      >
        {categories.map(category => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.value
                ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }`}
          >
            <SafeIcon icon={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
            <span className="text-xs opacity-75">({category.count})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`cursor-pointer rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
              onClick={() => handleResourceClick(resource)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                  {resource.hasAudio && (
                    <span className="px-2 py-1 bg-primary-500 text-white rounded-full text-xs font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiHeadphones} className="w-3 h-3" />
                      <span>Audio</span>
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(resource.category)} text-white`}>
                    {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{resource.type}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-4 h-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiStar} className="w-4 h-4" />
                    <span>{resource.benefits?.length || 0} benefits</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                      +{resource.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium"
                >
                  <span>Explore Resource</span>
                  <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            No resources match your current search or filter. Try adjusting your criteria or explore different categories.
          </p>
        </motion.div>
      )}

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <h3 className="text-lg font-semibold mb-4">Resource Library</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{resources.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Resources</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
              {resources.filter(r => r.hasAudio).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Audio Guides</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {resources.filter(r => r.difficulty === 'beginner').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Beginner Friendly</div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'}`}
        style={{
          backgroundImage: isDark 
            ? 'linear-gradient(to bottom right, rgba(31,41,55,0.9), rgba(17,24,39,0.9)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right, rgba(252,231,243,0.9), rgba(237,233,254,0.9)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiHeart} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Start Your Wellness Practice Today</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Whether you have 1 minute or 30 minutes, there's a resource here to support your mental health and wellbeing. Begin with what feels right for you.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory('meditation')}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Start with Meditation
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Resources;