import {images} from '../assets';
import {Joke, OnboardingPage, PartySituation, QuizQuestion, Story} from '../types';

export const onboardingPages: OnboardingPage[] = [
  {
    id: 'stories',
    badge: 'MYSTIC STORIES',
    badgeColor: '#9d63ff',
    title: 'Welcome to\nFunny Spirit!',
    description:
      'Discover hilarious and spine-tingling stories from the spirit world. Rate them, save your favorites, and dive into the unknown.',
    image: images.onboardingGhost,
  },
  {
    id: 'party',
    badge: 'PARTY GAME',
    badgeColor: '#ff7a13',
    title: 'Play With\nYour Friends!',
    description:
      'Gather your crew and take turns guessing wild supernatural situations. Who has the funniest spirit sense? Time to find out!',
    image: images.onboardingMasks,
  },
  {
    id: 'quiz',
    badge: 'QUIZZES & MINI-GAMES',
    badgeColor: '#10c8b3',
    title: 'Test Your\nSpirit Sense!',
    description:
      'Answer mystic riddles, unlock hilarious jokes, and hunt ghosts in our addictive tap-to-find mini-game. The spirits are waiting!',
    image: images.onboardingCandle,
  },
];

export const stories: Story[] = [
  {
    id: 'ghost-forgot-scary',
    emoji: '👻',
    title: 'The Ghost Who Forgot to Be Scary',
    category: 'Friendly Spirits',
    teaser: 'Harold tried to haunt the old blue house, but his “boo” sounded more apologetic than terrifying.',
    body: `In the old blue house at the end of Maple Lane, everyone knew there was a ghost. Curtains moved without wind, stairs creaked without footsteps, and every night at midnight someone whispered “Boooo” in a voice so gentle it sounded tired rather than terrifying.

The ghost was Harold, and he came from a famous haunting family. Unfortunately, whenever he rattled chains, he apologized for the noise. When he appeared in mirrors, he sneezed. When he floated through walls, he got stuck halfway and had to ask for help.

Then Lily moved in. Harold rose from the floorboards and whispered, “Beware…” Lily asked, “Beware of what?” Harold panicked and answered, “Dust?” She laughed kindly, and Harold turned pink.

From then on, Harold became the house helper. He found lost socks, cooled hot tea with ghost breath, and floated homework into school bags. The blue house became famous as the safest, strangest home in town, and Harold finally learned that some ghosts are meant to remind people where they left their keys.`,
  },
  {
    id: 'lantern-laughing-people',
    emoji: '🕯️',
    title: 'The Lantern That Followed Laughing People',
    category: 'Friendly Spirits',
    teaser: 'A blue lantern never led travelers where they wanted, but always somewhere worth remembering.',
    body: `Near Bramblewick stood a forest where paths changed direction and travelers often arrived back where they started, carrying mushrooms they did not remember picking.

A small floating lantern with a blue flame lived there. People said it belonged to Mr. Wibbles, a ghostly forest guide who had become bored with efficient directions. If the lantern appeared, you followed it.

Three overconfident friends entered the forest with snacks and a map. The snacks vanished, the map lied, and the lantern led them to a clearing with broken furniture, glowing mushrooms, and a ghost tea party. Mr. Wibbles poured imaginary tea and explained that nobody remembers a straight road, but everyone remembers a haunted tea party.

The friends returned laughing at dawn. After that, people entered the forest hoping to be lost properly.`,
  },
  {
    id: 'house-sneezed-midnight',
    emoji: '🏚️',
    title: 'The House That Sneezed at Midnight',
    category: 'Haunted Homes',
    teaser: 'The cursed house on Pepper Hill was not cursed. It was allergic.',
    body: `The crooked house on Pepper Hill had been empty for thirty years because every night at midnight it shouted “AAAAACHOO,” shook its shutters, and dropped a roof tile into the garden.

Nora brought blankets, sandwiches, a flashlight, and allergy medicine. Inside, the house opened doors, lit the fireplace, and pulled out chairs. It was not frightening them. It was hosting them.

At midnight the walls inhaled. Nora threw a blanket over a dusty portrait, and the house sighed with relief. A voice from the walls thanked her: the portrait had been tickling its hallway for decades.

The cousins cleaned all night. By morning the house looked warm and embarrassed. Years later it became The Midnight Sneeze, a guesthouse that warmed slippers and sneezed only when guests forgot to dust the attic.`,
  },
  {
    id: 'mirror-guest-room',
    emoji: '🪞',
    title: 'The Mirror in the Guest Room',
    category: 'Haunted Homes',
    teaser: 'The ghost in the silver mirror only wanted a sandwich and possibly applause.',
    body: `At a rainy roadside inn, nobody wanted the room with the silver mirror. At night, anyone who looked into it saw a pale gentleman standing behind them, smiling politely.

Four friends took the room because it was free. When Max glanced at the mirror, he screamed. The ghost screamed too. He stepped out, embarrassed, and introduced himself as Leonard.

Leonard had been trapped for a century after insulting a magician’s haircut. His curse required him to stand behind people and smile until someone asked what he wanted. Everyone screamed too early.

Max asked. Leonard requested a sandwich and applause. The sandwich fell through him, but his century-old comedy routine earned enough laughter to crack the mirror and set him free. Before vanishing, he warned them that the wardrobe had opinions.`,
  },
  {
    id: 'floating-socks',
    emoji: '🧦',
    title: 'The Case of the Floating Socks',
    category: 'Silly Mysteries',
    teaser: 'Nettleford was under supernatural laundry attack, and the socks had choreography.',
    body: `In Nettleford, missing socks returned after sunset floating through the streets in glowing pairs. The mayor called it a supernatural laundry attack.

Ben, Poppy, and Eli followed the socks to the abandoned washhouse. Inside, hundreds of socks danced while a tiny ghost in spectacles conducted them like an orchestra.

Miss Button had owned the washhouse in life and loved order. In death, unmatched socks offended her spirit. Each night she rescued lonely socks, washed them, matched them, and taught them confidence.

The children started a Lost Sock Box in the town square. Soon every household had matching pairs again, and the glowing sock parades became a beloved town event.`,
  },
  {
    id: 'soup-predicted-ghosts',
    emoji: '🍲',
    title: 'The Soup That Predicted Ghosts',
    category: 'Silly Mysteries',
    teaser: 'Every Thursday soup at the Cozy Cauldron Café predicted something strange.',
    body: `At the Cozy Cauldron Café, Thursday soup predicted events. Tomato soup shaped like a hat meant someone would lose a hat. Pumpkin soup spelling “duck” meant a duck would enter and refuse to leave.

When mushroom soup formed “GHOST AT TABLE SEVEN,” customers stared at a businessman whose spoon kept passing through the bowl. Arthur explained he was only a part-time ghost after falling asleep during a haunted museum tour.

The soup pot had belonged to Arthur’s fortune-teller grandmother, who refused to predict anything serious because serious predictions ruin lunch. Mrs. Plum renamed Thursday “Prophetic Soup Night.”

Arthur became the café mascot and helped interpret forecasts. He admitted most ghosts were less mysterious than people imagined. Half of them just wanted snacks.`,
  },
  {
    id: 'midnight-guest-list',
    emoji: '🎉',
    title: 'The Midnight Guest List',
    category: 'Party Legends',
    teaser: 'Once a year, black invitations appeared under random doors in Gloombridge.',
    body: `Every last Saturday of October, invitations appeared under doors in Gloombridge. They smelled faintly of candle smoke and promised the Midnight Gathering, plus cake.

Four friends followed the address to an abandoned ballroom. At midnight, the doors opened and the room filled with ghosts, a skeleton orchestra, glowing lemonade, and a headless magician who always dropped the cards.

The party was not meant to frighten the living. The tall phantom host confessed that ghosts simply missed being invited to things.

The friends returned every year wearing comfortable shoes, because some mysteries are better with cake.`,
  },
  {
    id: 'ghost-talent-show',
    emoji: '🎭',
    title: 'The Ghost Talent Show',
    category: 'Party Legends',
    teaser: 'The old theater needed human judges, and ghosts are very sensitive artists.',
    body: `Every Friday night, applause thundered inside the closed theater. A group of friends slipped through the side door and were rushed into the front row as human judges.

The Ghost Talent Show began with a headless singer, synchronized Victorian twins, a pirate comedian, and a tiny ghost dog that vanished into a hat. The friends scored carefully because a seven made the ceiling rain glitter.

The theater had been cursed to repeat opening night until someone watched the entire show and applauded sincerely. The friends did, and the curse lifted.

The performers stayed anyway. Rest is nice, the pirate said, but applause is better.`,
  },
  {
    id: 'box-said-boo',
    emoji: '📦',
    title: 'The Box That Said Boo',
    category: 'Weird Endings',
    teaser: 'The tiny ghost inside the attic box demanded to be feared responsibly.',
    body: `Milo found a wooden box in his grandmother’s attic with a note that said: Do not open unless you are ready to be mildly frightened. He was absolutely ready.

The box coughed, then a tiny voice said “Boo.” Inside sat Boorick, an apple-sized ghost wearing a paper crown and holding a toothpick like a royal sword.

Boorick claimed a wizard had shrunk him after one unfortunate party. Milo and his friends built him paperclip chains, a matchbox throne, and a reputation for haunting crumbs.

Then Grandma entered and sighed. Boorick had not been cursed by a wizard. She had boxed him because he kept stealing biscuits and blaming dark forces. He looked offended, but crumbs covered his ghostly face.`,
  },
  {
    id: 'moonlight-riddle-club',
    emoji: '🌙',
    title: 'The Moonlight Riddle Club',
    category: 'Weird Endings',
    teaser: 'A locked library room appeared only during full moons, and every riddle had a ghost attached.',
    body: `In the town library, a door appeared only when moonlight touched the wall. Its brass sign read: Moonlight Riddle Club. Members living, dead, and undecided welcome.

Four friends entered and found ghosts in reading glasses arguing over strange situation cards. Each riddle was based on a real unfinished ghost story. Solving the truth helped a spirit stop worrying about it.

The friends became regular members until one card appeared: four friends enter a moonlit room and think they are solving ghost stories. What are the ghosts really solving?

Miss Hollow smiled and said, “Your story, of course.”`,
  },
  {
    id: 'frog-wrong-castle',
    emoji: '🐸',
    title: 'The Frog Who Guarded the Wrong Castle',
    category: 'Odd Creatures',
    teaser: 'Sir Ribbert guarded a tiny castle for seven years before checking who lived there.',
    body: `At the edge of a rainy kingdom stood a castle no taller than a garden shed, guarded by a huge green frog in a golden helmet.

Sir Ribbert shouted “None shall pass!” with heroic determination. One stormy day, Tessa asked who lived inside. The frog said the royal family, obviously. The castle contained dust, a cracked teacup, and beetles eating dinner.

The wizard who hired him had terrible handwriting. The real castle was two hills away. Tessa turned the tiny building into the kingdom’s magical Lost & Found, and Sir Ribbert guarded forgotten crowns, invisible umbrellas, and one rude talking shoe.

He became the most trusted frog in the kingdom and always read contracts twice.`,
  },
  {
    id: 'late-omen-owl',
    emoji: '🦉',
    title: 'The Owl That Delivered Bad Omens Late',
    category: 'Odd Creatures',
    teaser: 'Horatio was magical, proud, and almost never on time.',
    body: `In Moonridge, Horatio the owl delivered omens. Three hoots meant storms, a silver feather meant treasure, and circles over the well meant danger.

The problem was timing. He warned of rain after people were soaked and delivered falling-rock omens after the rocks had become a decorative garden wall.

Felix discovered Horatio’s map was upside down, causing him to deliver omens from the past. Fixing the map helped for two days, then Horatio began delivering omens from next Thursday, last Tuesday, and someone else’s birthday.

The village accepted him as entertainment. Horatio remained a terrible prophet, but an excellent storyteller.`,
  },
  {
    id: 'broom-applause',
    emoji: '🧹',
    title: 'The Broom That Wanted Applause',
    category: 'Cursed Objects',
    teaser: 'Clara bought a self-sweeping broom and accidentally adopted an artist.',
    body: `The antique shop broom swept by itself, but only when someone watched and applauded. Clara clapped once, and it spun across the kitchen collecting crumbs, dust, and one confused beetle.

Soon neighbors gathered at the window while the broom swept in circles, bowed after corners, and juggled spoons. Clara realized she did not own a cleaning tool. She owned a performer.

One night it followed a trail of glittering dust to the theater and won first prize in a talent show with an emotional solo about household labor.

It returned home with a medal and cleaned only on weekends after a proper introduction.`,
  },
  {
    id: 'clock-repeated-lunch',
    emoji: '🕰️',
    title: 'The Clock That Repeated Lunch',
    category: 'Cursed Objects',
    teaser: 'Butterwick’s town hall clock made everyone hungry twice at noon.',
    body: `Every day at noon, the town hall clock in Butterwick rang twelve times, waited politely, then rang twelve more. After the second ringing, everyone became hungry again.

At first, two lunches felt heroic. Then noon lasted nearly two hours and the mayor’s trousers stopped cooperating.

Ivo climbed the tower and found a tiny brass spirit of punctual meals wearing a napkin as a cape. It was offended by people rushing lunch at desks. Ivo negotiated a real lunch hour with no meetings.

The clock stopped doubling noon. At exactly 3 p.m., it rang once and dropped a sandwich from the tower. Nobody complained.`,
  },
  {
    id: 'tree-lied-treasure',
    emoji: '🌲',
    title: 'The Tree That Lied About Treasure',
    category: 'Forest Mischief',
    teaser: 'The Talking Tree was most useful when asked the wrong question.',
    body: `In Whisperpine Forest stood a tree with knot-hole eyes and a smug wooden mouth. Whenever travelers asked for directions, it lied.

Three friends asked where treasure definitely was not. The tree answered that it was absolutely not beneath the flat stone near the stream. There they found a rusty key. They asked what it definitely did not open, and found a chest with a book titled Rules for Annoying Trees.

The tree had once been a guardian, but centuries of greedy questions had made it answer in the least helpful way possible.

After that, it still lied, but with style. It sent greedy treasure hunters into mud and guided lost children safely by pretending not to.`,
  },
  {
    id: 'mushroom-council',
    emoji: '🍄',
    title: 'The Mushroom Council’s Terrible Decision',
    category: 'Forest Mischief',
    teaser: 'The magical mushrooms were wise, serious, and terrible at practical solutions.',
    body: `Deep under an old oak, a council of magical mushrooms maintained forest balance with very serious voices and very bad plans.

When squirrels stole acorns, they voted to give every squirrel a backpack. When rain fell for ten days, they asked the clouds politely. When a giant lost a sock so powerful flowers fainted, the council debated burying it, declaring it a mountain, or marrying it to a tree.

Pippa suggested washing it in the river and returning it. The mushrooms were shocked by the practicality.

The giant planted moonflowers in thanks, and Pippa became the council’s unofficial advisor. Wisdom was useful, but common sense was faster.`,
  },
  {
    id: 'cat-mayor',
    emoji: '🐈‍⬛',
    title: 'The Cat Mayor of Midnight Street',
    category: 'Moonlit Town',
    teaser: 'Madam Whiskerwick fined humans three sardines for unauthorized vertical behavior.',
    body: `Midnight Street appeared only after sunset between the bakery and the post office. Its shops sold bottled dreams, reversible shadows, and umbrellas for indoor rain.

The mayor was Madam Whiskerwick, a black cat with a silver chain of office. Oscar entered while chasing a kite and was fined three sardines for climbing a drainpipe without permission.

Since he had no sardines, he helped solve the street’s missing-shadow problem. The thief was a lonely umbrella seller whose own shadow had run away. Oscar proposed a Shadow Social, and the seller’s shadow returned after realizing street performance was exhausting.

Oscar left before dawn, but every full moon a mayoral notice appears under his door demanding fish.`,
  },
  {
    id: 'dream-bakery',
    emoji: '🧁',
    title: 'The Bakery That Sold Dreams',
    category: 'Moonlit Town',
    teaser: 'Madame Crumb’s pastries flavored dreams, but the mystery pastry dreamed back.',
    body: `Madame Crumb’s Dream Pastries opened only after midnight. Blueberry meant flying dreams, honey-almond meant forgotten summers, and chocolate-moon left people smiling for hours.

The one rule was never eat the mystery pastry. June did. That night, she dreamed the bakery kitchen, where pastries whispered and the oven wore spectacles. Madame Crumb warned that the pastry dreamed back.

Over the week, crumbs from June’s dreams entered reality: a dragon biscuit in her schoolbag, powdered sugar rain at breakfast, and a polite dream knight hiding in the wardrobe.

June finished the dream properly by helping the oven find its glasses and teaching pastries to sing. Afterward, she could smell dreams before they happened.`,
  },
  {
    id: 'vampire-tomatoes',
    emoji: '🧛',
    title: 'The Vampire Who Feared Tomatoes',
    category: 'Funny Monsters',
    teaser: 'Count Vesper owned three hundred capes and one very specific fear.',
    body: `Count Vesper slept in a velvet coffin, lived in a black castle, and owned every dramatic cape a vampire could want. Garlic did nothing. Sunlight made him sneeze. Tomatoes made him leap onto furniture screaming.

Mina learned the reason: centuries earlier, Vesper had slipped on a tomato at a royal banquet and landed face-first in pudding. His dignity never recovered.

Mina helped him slowly with tomato drawings, soup, and one cherry tomato placed very far away. At a village festival, he tasted a tomato tart and smiled.

Then he slipped on another tomato and landed in whipped cream. For one second everyone froze. Vesper laughed first, and tomatoes lost their power over him forever.`,
  },
  {
    id: 'zombie-manners',
    emoji: '🧟',
    title: 'The Zombie Who Loved Manners',
    category: 'Funny Monsters',
    teaser: 'Barnaby rose from the grave with one goal: proper etiquette.',
    body: `When Barnaby appeared in Little Hollow, everyone hid. He simply stood in the square with a notebook and groaned, “Good evening.”

He had risen with no interest in chasing anyone. He wanted manners. Miss Bell taught him to sip tea, bow, write thank-you notes, and avoid saying “brains” at dinner unless discussing intelligence.

Soon Barnaby became the politest person in town. When rude monsters arrived expecting fear, they found him hosting tea. He stood, adjusted his jacket, and declared that rudeness was the true horror.

By morning, the monsters had apologized and promised to haunt responsibly. Little Hollow still celebrates Barnaby every autumn.`,
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'soup-ghost',
    emoji: '🍲',
    question: 'What should you do if a ghost appears in your kitchen and starts judging your soup?',
    options: ['Scream and leave forever', 'Ask if it wants more salt', 'Throw the soup out the window', 'Challenge it to a dance battle'],
    correctIndex: 1,
    explanation: 'A soup-judging ghost clearly has culinary unfinished business. Salt is the safest diplomatic option.',
  },
  {
    id: 'vampire-party',
    emoji: '🧛',
    question: 'Why did the vampire refuse to enter the party?',
    options: ['The music was too cheerful', 'He forgot his dramatic cape', 'Nobody invited him in', 'He was afraid of balloons'],
    correctIndex: 2,
    explanation: 'Traditional vampires need an invitation to enter, even if the party has snacks and suspiciously good lighting.',
  },
  {
    id: 'wardrobe-haunted',
    emoji: '🧥',
    question: 'What is the biggest warning sign that your wardrobe is haunted?',
    options: ['It gives fashion advice at 3 AM', 'It smells like old wood', 'It has too many coats inside', 'It makes normal creaking sounds'],
    correctIndex: 0,
    explanation: 'A wardrobe whispering “not those shoes again” is definitely supernatural.',
  },
  {
    id: 'polite-zombie',
    emoji: '🧟',
    question: 'What does a polite zombie usually say before entering a room?',
    options: ['Brains first, questions later', 'Good evening, may I come in?', 'I own this hallway now', 'Where is the nearest graveyard?'],
    correctIndex: 1,
    explanation: 'A manners-focused zombie respects formal entrances. The terrifying part is how civilized he is.',
  },
  {
    id: 'mirror-speaking',
    emoji: '🪞',
    question: 'Why did the haunted mirror stop scaring people?',
    options: ['It joined a comedy club', 'People screamed before it finished speaking', 'It became a window', 'It forgot how reflections work'],
    correctIndex: 1,
    explanation: 'Even haunted mirrors need proper communication. Constant screaming is rude during a supernatural presentation.',
  },
  {
    id: 'tiny-monster',
    emoji: '👹',
    question: 'What is the best way to defeat a tiny monster hiding under your bed?',
    options: ['Offer it a roommate agreement', 'Vacuum the entire room', 'Sing louder than it growls', 'Pretend the bed does not exist'],
    correctIndex: 0,
    explanation: 'Tiny monsters are often interested in boundaries, snacks, and charger access.',
  },
  {
    id: 'ghost-fridge',
    emoji: '🧀',
    question: 'Why did the ghost chef haunt the fridge?',
    options: ['He guarded ancient ice cubes', 'He wanted to finish his midnight snack', 'He hated vegetables', 'He waited for a delivery discount'],
    correctIndex: 1,
    explanation: 'A ghost chef with unfinished snack business will naturally choose the fridge as his eternal workplace.',
  },
  {
    id: 'plant-leaf',
    emoji: '🪴',
    question: 'What does it mean if your houseplant points one leaf toward the hallway?',
    options: ['It discovered a portal', 'It wants more sunlight', 'It saw a spider and is being dramatic', 'It wants to become a tree'],
    correctIndex: 2,
    explanation: 'Indoor plants can still panic when nature gets too close.',
  },
  {
    id: 'moon-disappointed',
    emoji: '🌙',
    question: 'Why did the moon look disappointed through your window?',
    options: ['You promised to sleep early and kept scrolling', 'You forgot to wave', 'It lost a staring contest', 'Your curtains were ugly'],
    correctIndex: 0,
    explanation: 'The moon sees fake bedtime promises and “just five more minutes” lies.',
  },
  {
    id: 'haunted-chair',
    emoji: '🪑',
    question: 'What is the most suspicious thing a haunted chair can do?',
    options: ['Creak loudly', 'Face the wall', 'Demand felt pads and better posture', 'Stand near a table'],
    correctIndex: 2,
    explanation: 'Haunted chairs organize workplace action about being dragged across floors.',
  },
  {
    id: 'cursed-dice',
    emoji: '🎲',
    question: 'Why did the cursed dice lock every door in the house?',
    options: ['The game had started', 'It hated fresh air', 'It wanted privacy', 'It was afraid of carpets'],
    correctIndex: 0,
    explanation: 'A cursed game usually begins before anyone understands the rules.',
  },
  {
    id: 'cursed-board-game',
    emoji: '🥣',
    question: 'What should you never roll in a cursed board game?',
    options: ['Thunder', 'Soup', 'A moonbeam', 'A chair'],
    correctIndex: 1,
    explanation: 'Nobody knows why soup is dangerous in cursed games, but the couch voice should be trusted.',
  },
  {
    id: 'vampire-wifi',
    emoji: '📶',
    question: 'What is the real reason the vampire knocked on your window?',
    options: ['He wanted your Wi-Fi password', 'He checked the weather', 'He forgot his coffin', 'He was selling umbrellas'],
    correctIndex: 0,
    explanation: 'Modern vampires have modern problems. Eternal life is useless without internet.',
  },
  {
    id: 'freezer-snowman',
    emoji: '⛄',
    question: 'Why did the snowman in the freezer raise his twig arm?',
    options: ['He wanted to rule winter', 'He asked for directions', 'Old ice buildup became conscious', 'He wanted sunglasses'],
    correctIndex: 2,
    explanation: 'Forgotten freezer ice can become mysterious if ignored long enough.',
  },
  {
    id: 'ghost-audience',
    emoji: '👏',
    question: 'What is the worst thing a ghost audience can do while watching your life?',
    options: ['Boo during breakfast', 'Clap when you finally clean your room', 'Steal your remote', 'Float through the ceiling'],
    correctIndex: 1,
    explanation: 'Applause for basic adult tasks is supportive and deeply humiliating.',
  },
  {
    id: 'toothbrush-glow',
    emoji: '🦷',
    question: 'Why did the haunted toothbrush glow?',
    options: ['A tooth fairy intern possessed it', 'It wanted to be a lightsaber', 'It charged wirelessly', 'It saw your dentist bill'],
    correctIndex: 0,
    explanation: 'A tooth fairy intern assigned to adult dental inspections would absolutely judge brushing.',
  },
  {
    id: 'ghost-postman',
    emoji: '📮',
    question: 'What does a ghost postman usually deliver?',
    options: ['Perfectly normal emails', 'Bills from 1874 and expired bakery coupons', 'Fresh vegetables', 'Furniture instructions'],
    correctIndex: 1,
    explanation: 'Ghost postmen refuse to retire, but their routes may be a century out of date.',
  },
  {
    id: 'haunted-book',
    emoji: '📖',
    question: 'Why did the haunted book title change to “How You Will Disappear Tonight”?',
    options: ['It wanted to scare you', 'It was a cookbook with dramatic marketing', 'It predicted doom', 'It was written by your sofa'],
    correctIndex: 1,
    explanation: 'The full title was about disappearing into the kitchen for pancakes.',
  },
  {
    id: 'jacket-door',
    emoji: '🧥',
    question: 'What does it mean when your jacket points one sleeve toward the door?',
    options: ['It wants to go to a coat rack party', 'It is possessed by winter', 'It hates your room', 'It wants to become a blanket'],
    correctIndex: 0,
    explanation: 'Some jackets have better social lives than their owners.',
  },
  {
    id: 'goldfish-rent',
    emoji: '🐟',
    question: 'Why did the goldfish suddenly ask to discuss the rent?',
    options: ['It became a landlord', 'An accountant ghost possessed it', 'It wanted a bigger bowl', 'It was jealous of the cat'],
    correctIndex: 1,
    explanation: 'Accountant ghosts believe everyone must contribute to the household budget.',
  },
  {
    id: 'phone-notes',
    emoji: '📱',
    question: 'What is the most likely reason your phone opened Notes by itself?',
    options: ['It wanted poetry', 'It was hacked by a goblin', 'Your ignored reminders formed a union', 'The screen was bored'],
    correctIndex: 2,
    explanation: 'Forgotten reminders eventually become organized. Their first demand is usually water or sleep.',
  },
  {
    id: 'zombie-lessons',
    emoji: '🎩',
    question: 'What should you say to a zombie taking etiquette lessons?',
    options: ['Good evening, your posture is improving', 'Run faster', 'Please stop being alive-ish', 'Brains are in the kitchen'],
    correctIndex: 0,
    explanation: 'Complimenting posture is very civilized.',
  },
  {
    id: 'drain-singing',
    emoji: '🚿',
    question: 'Why did the shower drain start singing?',
    options: ['It launched a music career', 'It was calling fish', 'It wanted hot water', 'It swallowed a radio'],
    correctIndex: 0,
    explanation: 'After years of hearing bathroom singing, the drain decided it was finally its turn.',
  },
  {
    id: 'fire-spirit',
    emoji: '🔥',
    question: 'What is the biggest problem with a tiny fire spirit?',
    options: ['It grants only useless wishes', 'It eats candles', 'It is afraid of matches', 'It speaks in smoke signals'],
    correctIndex: 0,
    explanation: '“Slightly warmer soup” is not exactly legendary magic.',
  },
  {
    id: 'nightstand-cupcake',
    emoji: '🧁',
    question: 'Why did the mysterious cupcake appear on your nightstand?',
    options: ['Your future ghost came too early', 'The bakery got lost', 'A vampire wanted dessert', 'The pillow ordered it'],
    correctIndex: 0,
    explanation: 'A future ghost celebrating your responsible decision is sweet but suspiciously unhelpful.',
  },
  {
    id: 'raven-council',
    emoji: '🐦',
    question: 'What is the correct response if a raven says “The council has chosen you”?',
    options: ['Ask which council before accepting', 'Immediately buy a sword', 'Hide under the table', 'Apologize to the moon'],
    correctIndex: 0,
    explanation: 'The council might just be neighborhood birds with trash-bin politics.',
  },
  {
    id: 'chairs-wall',
    emoji: '🪑',
    question: 'Why did the chairs face the wall?',
    options: ['They watched invisible TV', 'They protested bad treatment', 'They feared the table', 'They wanted to become shelves'],
    correctIndex: 1,
    explanation: 'Furniture has limits. Dragging chairs without respect can lead to organized supernatural action.',
  },
  {
    id: 'pizza-payment',
    emoji: '🍕',
    question: 'What does a haunted pizza box mean by “Payment already collected”?',
    options: ['You screamed dramatically', 'You paid last week', 'The pizza is imaginary', 'The cheese signed the receipt'],
    correctIndex: 0,
    explanation: 'Ghost payments are rarely financial. One proper scream can cover delivery fees.',
  },
  {
    id: 'mirror-lighting',
    emoji: '💡',
    question: 'Why did the bathroom mirror ask for better lighting?',
    options: ['It wanted fame', 'It negotiated silence after witnessing shampoo theft', 'It hated darkness', 'It started a beauty channel'],
    correctIndex: 1,
    explanation: 'Mirrors see everything, including crimes against expensive shampoo bottles.',
  },
  {
    id: 'kevin-monster',
    emoji: '👹',
    question: 'What is the most suspicious thing about a monster named Kevin?',
    options: ['He is lost and embarrassed', 'He has claws', 'He hides under beds', 'He comes out at night'],
    correctIndex: 0,
    explanation: 'Monsters named Kevin are usually confused, dusty, and looking for the correct apartment.',
  },
  {
    id: 'haunted-socks',
    emoji: '🧦',
    question: 'Why did the haunted socks follow you down the hallway?',
    options: ['They wanted revenge', 'They looked for their missing left cousin', 'They hated clean floors', 'They thought you were a washer'],
    correctIndex: 1,
    explanation: 'The true horror of laundry is unresolved sock separation trauma.',
  },
  {
    id: 'magician-gloves',
    emoji: '🧤',
    question: 'What happens when gloves from a cursed magician reunite?',
    options: ['They disappear forever', 'They make your keys vanish', 'They turn into birds', 'They start knitting'],
    correctIndex: 1,
    explanation: 'Magician gloves cannot resist making useful objects impossible to find.',
  },
  {
    id: 'soup-name',
    emoji: '🍲',
    question: 'What did the self-aware soup want to be called?',
    options: ['Lord Spoonington', 'Sebastian', 'Captain Broth', 'Soupzilla'],
    correctIndex: 1,
    explanation: 'After too many reheats, even soup deserves a name and emotional boundaries.',
  },
  {
    id: 'ghost-actor',
    emoji: '🎬',
    question: 'What is the safest way to react to a dramatic ghost actor on your TV?',
    options: ['Rate his performance honestly but gently', 'Throw the remote', 'Turn off the moon', 'Ask him to pay rent'],
    correctIndex: 0,
    explanation: 'Ghost actors are sensitive. Honest notes should be gentle.',
  },
  {
    id: 'cheese-placement',
    emoji: '🧀',
    question: 'Why did the tiny ghost chef judge your lifestyle?',
    options: ['You kept cheese badly organized', 'You owned too many plates', 'You ate breakfast too early', 'You forgot to name the fridge'],
    correctIndex: 0,
    explanation: 'A chef ghost may forgive fear, but never chaotic cheese placement.',
  },
  {
    id: 'lamp-selfie',
    emoji: '💡',
    question: 'What is the most likely reason your lamp bent toward you?',
    options: ['It wanted to whisper a secret', 'It blamed your selfie angle', 'It became a plant', 'It joined the dark side'],
    correctIndex: 1,
    explanation: 'The lamp is tired of being blamed when camera angle is the real villain.',
  },
  {
    id: 'indoor-cloud',
    emoji: '☁️',
    question: 'Why did the cloud inside your apartment ask to stay until Monday?',
    options: ['Outside weather was too competitive', 'It hated umbrellas', 'It wanted your sofa', 'It hid from birds'],
    correctIndex: 0,
    explanation: 'A shy indoor cloud may need emotional space.',
  },
  {
    id: 'ritual-candles',
    emoji: '🕯️',
    question: 'What is the real reason the ritual candles appeared in your room?',
    options: ['Dramatic ghosts planned a surprise birthday party', 'A demon needed decoration advice', 'Your carpet summoned them', 'The moon ordered a meeting'],
    correctIndex: 0,
    explanation: 'Not every candle circle means doom. Sometimes ghosts are theatrical party planners.',
  },
  {
    id: 'bakery-review',
    emoji: '🍪',
    question: 'What did the kitchen goblin write in his bakery review?',
    options: ['Too much fear', 'Needs more cinnamon and fear', 'Excellent screaming texture', 'Would haunt again'],
    correctIndex: 1,
    explanation: 'Spooky food critics are harsh but specific.',
  },
  {
    id: 'wardrobe-danger',
    emoji: '👕',
    question: 'What is the main danger of a haunted wardrobe?',
    options: ['It may teleport you', 'It may eat sweaters', 'It may insult your outfit', 'It may turn into a tree'],
    correctIndex: 2,
    explanation: 'Fashion criticism from furniture attacks confidence.',
  },
];

export const partySituations: PartySituation[] = [
  {
    id: 'fridge-whisper',
    situation: '🌙 You wake up at 2:17 AM because someone is whispering your name from inside the fridge. A soft blue glow leaks from behind the milk.',
    answer: '👻 It is a tiny ghost chef with unfinished midnight snack business. He asks for crackers and then judges your cheese organization.',
  },
  {
    id: 'mirror-knows',
    situation: '🕯️ The bathroom mirror fogs up even though nobody showered. Slowly, words appear: “I KNOW WHAT YOU DID.”',
    answer: '🪞 It knows you used expensive shampoo and put water in the bottle afterward. The mirror wants a towel upgrade and better lighting.',
  },
  {
    id: 'hallway-socks',
    situation: '👀 You hear footsteps following you down an empty hallway. Every time you stop, they stop too.',
    answer: '🧦 A pair of haunted socks escaped the laundry. They just want you to admit you lost their left cousin in 2019.',
  },
  {
    id: 'monster-kevin',
    situation: '🌕 Your phone lights up at midnight with a message: “I’m under your bed. Please don’t scream.”',
    answer: '👹 It is Kevin, a small monster who meant to haunt downstairs. He is embarrassed, allergic to dust, and needs a taxi.',
  },
  {
    id: 'vampire-window',
    situation: '🦇 You hear scratching at the window. A pale face taps three times on the glass.',
    answer: '🧛 It is a vampire who forgot his Wi-Fi password. He will trade eternal life for 20 minutes of internet.',
  },
  {
    id: 'sunset-box',
    situation: '📦 A box appears outside your door with a note: “Do not open after sunset.” Unfortunately, it is already sunset.',
    answer: '🎩 Inside is a cursed magician’s rabbit waiting 80 years to finish a trick. He pulls your missing charger from his hat.',
  },
  {
    id: 'self-aware-soup',
    situation: '🍽️ Your kitchen table is set for dinner with soup and a note that says: “We need to talk.”',
    answer: '🍲 The soup became self-aware after too many reheats. It feels emotionally overcooked and wants to be called Sebastian.',
  },
  {
    id: 'piano-birthday',
    situation: '🎹 The old piano plays a haunting melody by itself, then suddenly switches to a terrible birthday song.',
    answer: '👻 The ghost pianist is pretending to be dramatic but never learned music. Nobody had the heart to stop him for 126 years.',
  },
  {
    id: 'clock-oops',
    situation: '🕰️ Every clock stops at 3:33 AM. One starts ticking backward and a tiny voice inside says, “Oops.”',
    answer: '⏳ A time goblin accidentally deleted Thursday and is restoring it from a backup that includes your old haircut.',
  },
  {
    id: 'cat-corner',
    situation: '🐈‍⬛ Your cat stares at an empty corner. The corner whispers, “Tell him I’m sorry.”',
    answer: '👻 The previous house cat hid 37 toy mice in the wall and wants forgiveness after a formal snack tribute.',
  },
  {
    id: 'locked-door-clap',
    situation: '🚪 A locked door opens by itself. From inside, someone softly claps.',
    answer: '👏 A ghost audience has been watching your life and applauded because you finally folded laundry after six days.',
  },
  {
    id: 'toy-council',
    situation: '🧸 You wake up and see your childhood toys in a circle around your bed, with your teddy holding a note.',
    answer: '🧸 The toys support you, but the note says ordering fries at midnight three times this week concerns the council.',
  },
  {
    id: 'indoor-rain',
    situation: '🌧️ You hear rain outside, but the sky is clear. Water starts dripping upward from floor to ceiling.',
    answer: '☔ A shy cloud got lost inside your apartment and asks to stay until Monday because outside weather is too competitive.',
  },
  {
    id: 'tv-actor',
    situation: '📺 Your TV turns on by itself and shows a shadowy figure pointing directly at you.',
    answer: '🎬 A ghost actor is filming an audition tape and gets offended if you call the pointing a little basic.',
  },
  {
    id: 'ghost-pizza',
    situation: '🍕 At midnight, a pizza box appears on your doorstep. It says: “Payment already collected.”',
    answer: '👻 A ghost ordered pizza to your address because spirits cannot receive deliveries. Payment was one dramatic scream.',
  },
  {
    id: 'chair-protest',
    situation: '🪑 Every dining chair is facing the wall. One chair slowly turns toward you.',
    answer: '🪑 The chairs are protesting dragged floors. They demand felt pads, better posture, and one day off per week.',
  },
  {
    id: 'pancake-book',
    situation: '📚 A book falls from the shelf and the title changes to: “How You Will Disappear Tonight.”',
    answer: '📖 It is a dramatic cookbook. The full title sends you into the kitchen for pancakes.',
  },
  {
    id: 'drain-album',
    situation: '🛁 You hear deep emotional singing from the bathroom, but you live alone.',
    answer: '🧼 Your shower drain started a music career after years of listening to everyone else sing badly.',
  },
  {
    id: 'selfie-lamp',
    situation: '💡 The lights flicker, then your lamp bends toward you like it wants to whisper a secret.',
    answer: '💡 The lamp is tired of being blamed for bad selfie lighting. It says the real problem is your camera angle.',
  },
  {
    id: 'cookie-note',
    situation: '🍪 You leave one cookie on a plate. Later it is gone, and a note says: “For supernatural reasons.”',
    answer: '🧌 A kitchen goblin stole it for a haunted bakery review blog and gave it 4 stars.',
  },
  {
    id: 'jacket-party',
    situation: '🧥 Your jacket moves across the room and points one sleeve toward the door.',
    answer: '🧥 Your jacket wants to attend a coat rack party and asks you not to embarrass it.',
  },
  {
    id: 'purple-flame',
    situation: '🕯️ You light a candle. The flame turns purple and a tiny voice says, “Finally.”',
    answer: '🔥 You summoned a small fire spirit who only grants useless wishes like slightly warmer soup.',
  },
  {
    id: 'etiquette-zombie',
    situation: '🧟 Slow footsteps stop outside your bedroom. A shadow knocks politely.',
    answer: '🧟 It is a zombie taking etiquette lessons. He needs feedback before people scream over his greeting.',
  },
  {
    id: 'moon-face',
    situation: '🌙 You look out the window and the moon has a face. It looks disappointed.',
    answer: '🌝 The moon saw you promise to sleep early, then scroll for two more hours.',
  },
  {
    id: 'attic-open-mic',
    situation: '🎭 Laughter comes from the attic. Upstairs, a spotlight and microphone are waiting.',
    answer: '👻 The attic ghosts started a comedy club, and you are tonight’s opening act.',
  },
  {
    id: 'freezer-snowman',
    situation: '🧊 You open the freezer and see a tiny snowman between frozen peas and ice cream.',
    answer: '⛄ It is forgotten ice buildup that gained consciousness and has concerns about your snack choices.',
  },
  {
    id: 'retired-postman',
    situation: '🔔 The doorbell rings at 11:11 every night. Tonight, a small envelope is on the mat.',
    answer: '📮 A ghost postman refuses to retire. The envelope has a bill from 1874 and an expired bakery coupon.',
  },
  {
    id: 'plant-drama',
    situation: '🪴 Your houseplant shakes violently, then points one leaf toward the hallway.',
    answer: '🪴 It saw a spider and admits indoor nature has different boundaries.',
  },
  {
    id: 'dice-locks',
    situation: '🎲 You roll a strange old die. Every door in the house locks at once.',
    answer: '🎲 A cursed board game started. The tiny couch voice says it is mostly safe unless you roll soup.',
  },
  {
    id: 'toothbrush-intern',
    situation: '🦷 Something giggles in the bathroom drawer. Your toothbrush is glowing.',
    answer: '🧚 A tooth fairy intern is conducting adult dental inspections and calls your brushing spiritually lazy.',
  },
  {
    id: 'sock-portal',
    situation: '🕳️ A small black hole appears in your laundry basket and throws one sock back.',
    answer: '🌀 It is a portal to the Sock Dimension. They rejected that sock for being too dramatic.',
  },
  {
    id: 'raven-scroll',
    situation: '🐦 A raven lands on your windowsill with a scroll: “The council has chosen you.”',
    answer: '🐦 The council is neighborhood birds who need a human representative after a trash-bin crisis.',
  },
  {
    id: 'bed-agreement',
    situation: '🛏️ A clawed hand reaches from under your bed holding a piece of paper.',
    answer: '👹 The under-bed monster wants a roommate agreement with quiet hours, fewer crumbs, and shared charger access.',
  },
  {
    id: 'vampire-windows',
    situation: '🧛 A vampire says, “Invite me in.” His cape moves dramatically with no wind.',
    answer: '🧛 He sells gothic windows with excellent insulation. The cape is part of the brand.',
  },
  {
    id: 'birthday-ritual',
    situation: '🕯️ A circle of candles appears in your room with a note: “Complete the ritual.”',
    answer: '🍰 It is a surprise birthday party from extremely dramatic ghosts. The red ink is strawberry syrup.',
  },
  {
    id: 'fish-rent',
    situation: '🐟 Your goldfish looks at you and says, “We need to discuss the rent.”',
    answer: '🐟 An accountant ghost possessed the fish and believes everyone should contribute, including the cat.',
  },
  {
    id: 'glove-trick',
    situation: '🧤 Two gloves crawl toward each other on your table. When they touch, the lights go out.',
    answer: '🧤 Cursed magician gloves reunited for one final trick: making your keys disappear.',
  },
  {
    id: 'water-spirit',
    situation: '🚿 The shower turns on by itself. Steam fills the room and the mirror says: “Too cold. Try again.”',
    answer: '🚿 A water spirit lives in your pipes and has strong opinions about temperature.',
  },
  {
    id: 'future-cupcake',
    situation: '🧁 You wake up to a cupcake on your nightstand with one lit candle, but it is not your birthday.',
    answer: '🎂 Your future ghost is celebrating one responsible decision, but arrived early and refuses to say which one.',
  },
  {
    id: 'reminder-union',
    situation: '📱 Your phone unlocks itself, opens Notes, and writes: “Stop ignoring me.”',
    answer: '📱 Your unread reminders formed a union and demand closure, starting with drink water.',
  },
];

export const jokes: Joke[] = [
  {setup: '👻 A ghost walked into a bakery and asked for the lightest cake.', punchline: 'The baker gave him air pie with invisible frosting.'},
  {setup: '🧛 A vampire joined a dating app and wrote “I love long nights.”', punchline: 'He got blocked after asking everyone’s blood type.'},
  {setup: '🧟 A zombie tried to become a motivational speaker.', punchline: 'His first speech was called “Follow Your Brains.”'},
  {setup: '🪞 A haunted mirror started giving life advice.', punchline: 'Sadly, all of it was just “Reflect on yourself.”'},
  {setup: '🧙 A witch opened a coffee shop for monsters.', punchline: 'Her best drink was the double spellspresso.'},
  {setup: '🦇 A bat tried to become a life coach.', punchline: 'He told everyone to hang in there.'},
  {setup: '🕯️ A candle summoned a tiny demon by accident.', punchline: 'The demon asked if anyone had marshmallows.'},
  {setup: '🧦 A haunted sock escaped from the laundry basket.', punchline: 'It said it needed space after a toxic pair relationship.'},
  {setup: '🎃 A pumpkin tried stand-up comedy.', punchline: 'The crowd said his jokes were a little hollow.'},
  {setup: '🏚️ A haunted house started charging rent.', punchline: 'The ghosts complained because they already paid with emotional damage.'},
  {setup: '📱 A ghost downloaded a fitness app.', punchline: 'It was disappointed because it still could not get in shape.'},
  {setup: '🍲 A witch’s soup began talking.', punchline: 'It said, “Please stop stirring drama.”'},
  {setup: '🧛 A vampire went to the dentist.', punchline: 'The dentist said, “Good news: your bite is legendary.”'},
  {setup: '🕰️ A time traveler met a ghost at midnight.', punchline: 'They both said, “Haven’t we haunted here before?”'},
  {setup: '🧸 A teddy bear became possessed.', punchline: 'It still only wanted hugs, but now they were legally binding.'},
  {setup: '🧹 A magic broom quit its job.', punchline: 'It said it was tired of sweeping things under the rug.'},
  {setup: '🐺 A werewolf opened a hair salon.', punchline: 'Business was great, but every full moon he overdid the volume.'},
  {setup: '🪦 A skeleton tried to keep a secret.', punchline: 'Impossible. Everyone could see right through him.'},
  {setup: '👻 A ghost got a job in customer service.', punchline: 'Now he says “I understand your concern” in a terrifying voice.'},
  {setup: '🧙‍♀️ A witch lost her broom.', punchline: 'She had to take a hexi.'},
  {setup: '🧛 A vampire opened a restaurant.', punchline: 'It had great atmosphere, but every dish was served a little rare.'},
  {setup: '🧟 A zombie tried speed dating.', punchline: 'Everyone said he was moving too slowly.'},
  {setup: '🦉 An owl became a fortune teller.', punchline: 'Every prediction started with “Who knows?”'},
  {setup: '🚪 A door creaked open by itself.', punchline: 'It just wanted attention because everyone kept walking all over the floor.'},
  {setup: '🕷️ A spider moved into a haunted house.', punchline: 'The ghost said, “Finally, someone who understands web design.”'},
  {setup: '🧀 A ghost stole cheese from the fridge.', punchline: 'He said it was for spiritual nachos.'},
  {setup: '🧞 A genie granted a ghost three wishes.', punchline: 'The ghost wished to be seen, heard, and removed from the group chat.'},
  {setup: '🛏️ A monster under the bed asked for a raise.', punchline: 'It said nightmare work was emotionally exhausting.'},
  {setup: '🐸 A cursed frog joined a choir.', punchline: 'Everyone said his voice had real swamp energy.'},
  {setup: '🧙 A wizard tried online shopping.', punchline: 'He accidentally ordered a spell-checker.'},
];
