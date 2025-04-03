const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create accounts
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        email: 'alice@boardgamers.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'REVIEWER',
      },
    }),
    prisma.account.create({
      data: {
        email: 'bob@boardgamers.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'REVIEWER',
      },
    }),
    prisma.account.create({
      data: {
        email: 'charlie@boardgamers.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'REVIEWER',
      },
    }),
  ]);

  // Create reviewers
  const reviewers = await Promise.all([
    prisma.reviewer.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice@boardgamers.com',
        bio: 'Board game enthusiast with a passion for strategic games',
        avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        role: 'Senior Reviewer',
        accountId: accounts[0].id,
      },
    }),
    prisma.reviewer.create({
      data: {
        name: 'Bob Smith',
        email: 'bob@boardgamers.com',
        bio: 'Loves euro-style board games and deep gameplay mechanics',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        role: 'Content Creator',
        accountId: accounts[1].id,
      },
    }),
    prisma.reviewer.create({
      data: {
        name: 'Charlie Davis',
        email: 'charlie@boardgamers.com',
        bio: 'Specializes in family games and accessibility reviews',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        role: 'Junior Reviewer',
        accountId: accounts[2].id,
      },
    }),
  ]);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Strategy',
        description: 'Games that emphasize strategic planning and thinking',
        icon: 'strategy-icon',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Family',
        description: 'Games suitable for family play sessions',
        icon: 'family-icon',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Card Game',
        description: 'Games primarily using cards as components',
        icon: 'card-icon',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Cooperative',
        description: 'Games where players work together against the game',
        icon: 'coop-icon',
      },
    }),
  ]);

  // Create mechanics
  const mechanics = await Promise.all([
    prisma.mechanic.create({
      data: {
        name: 'Worker Placement',
        description: 'Players allocate limited workers to various actions',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Deck Building',
        description: 'Players construct a personal deck of cards during the game',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Tile Placement',
        description: 'Players place tiles to create a board or pattern',
      },
    }),
    prisma.mechanic.create({
      data: {
        name: 'Dice Rolling',
        description: 'Gameplay involves rolling and using dice results',
      },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'Best Seller',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Award Winner',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'New Release',
      },
    }),
  ]);

  // Create board games
  const games = await Promise.all([
    prisma.boardGame.create({
      data: {
        title: 'Settlers of Catan',
        publisher: 'Kosmos',
        releaseYear: 1995,
        description: 'Players collect resources to build settlements, cities, and roads to reach 10 victory points.',
        imageUrl: 'https://example.com/images/catan.jpg',
        minPlayers: 3,
        maxPlayers: 4,
        minPlaytime: 60,
        maxPlaytime: 120,
        minAge: 10,
        complexityRating: 2.3,
        isFeatured: true,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[1].id },
          ],
        },
        mechanics: {
          create: [
            { mechanicId: mechanics[2].id },
            { mechanicId: mechanics[3].id },
          ],
        },
        tags: {
          create: [
            { tagId: tags[0].id },
          ],
        },
      },
    }),
    prisma.boardGame.create({
      data: {
        title: 'Dominion',
        publisher: 'Rio Grande Games',
        releaseYear: 2008,
        description: 'A deck-building card game where players use cards to perform actions and buy more cards.',
        imageUrl: 'https://example.com/images/dominion.jpg',
        minPlayers: 2,
        maxPlayers: 4,
        minPlaytime: 30,
        maxPlaytime: 40,
        minAge: 13,
        complexityRating: 2.4,
        isFeatured: true,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[2].id },
          ],
        },
        mechanics: {
          create: [
            { mechanicId: mechanics[1].id },
          ],
        },
        tags: {
          create: [
            { tagId: tags[1].id },
          ],
        },
      },
    }),
    prisma.boardGame.create({
      data: {
        title: 'Pandemic',
        publisher: 'Z-Man Games',
        releaseYear: 2008,
        description: 'Players work as a team to treat infections around the world while gathering resources for cures.',
        imageUrl: 'https://example.com/images/pandemic.jpg',
        minPlayers: 2,
        maxPlayers: 4,
        minPlaytime: 45,
        maxPlaytime: 60,
        minAge: 8,
        complexityRating: 2.4,
        isFeatured: true,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[3].id },
          ],
        },
        mechanics: {
          create: [
            { mechanicId: mechanics[0].id },
          ],
        },
        tags: {
          create: [
            { tagId: tags[1].id },
          ],
        },
      },
    }),
    prisma.boardGame.create({
      data: {
        title: 'Ticket to Ride',
        publisher: 'Days of Wonder',
        releaseYear: 2004,
        description: 'Players collect cards to claim railway routes connecting cities across North America.',
        imageUrl: 'https://example.com/images/ticket-to-ride.jpg',
        minPlayers: 2,
        maxPlayers: 5,
        minPlaytime: 30,
        maxPlaytime: 60,
        minAge: 8,
        complexityRating: 1.9,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[1].id },
          ],
        },
        mechanics: {
          create: [
            { mechanicId: mechanics[2].id },
          ],
        },
        tags: {
          create: [
            { tagId: tags[0].id },
          ],
        },
      },
    }),
    prisma.boardGame.create({
      data: {
        title: 'Azul',
        publisher: 'Plan B Games',
        releaseYear: 2017,
        description: 'Players compete to create the most beautiful mosaic on their player boards.',
        imageUrl: 'https://example.com/images/azul.jpg',
        minPlayers: 2,
        maxPlayers: 4,
        minPlaytime: 30,
        maxPlaytime: 45,
        minAge: 8,
        complexityRating: 1.8,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[1].id },
          ],
        },
        mechanics: {
          create: [
            { mechanicId: mechanics[2].id },
          ],
        },
        tags: {
          create: [
            { tagId: tags[1].id },
            { tagId: tags[2].id },
          ],
        },
      },
    }),
  ]);

  // Create reviews with scores
  const reviews = await Promise.all([
    // Catan reviews
    prisma.review.create({
      data: {
        gameId: games[0].id,
        playDate: new Date('2023-10-15'),
        content: 'A classic game that still holds up today. The resource trading and settlement building mechanics create engaging player interaction.',
        reviewScores: {
          create: {
            reviewerId: reviewers[0].id,
            overallScore: 8.5,
            funScore: 8.0,
            easeToLearn: 7.5,
            themingArtwork: 7.0,
            replayability: 9.0,
            justification: 'Great for introducing new players to modern board games. The variable setup ensures good replayability.'
          }
        }
      }
    }),
    prisma.review.create({
      data: {
        gameId: games[0].id,
        playDate: new Date('2023-11-02'),
        content: 'While Catan is a classic, the dice-based resource collection can sometimes lead to frustrating games where players fall behind due to bad luck.',
        reviewScores: {
          create: {
            reviewerId: reviewers[1].id,
            overallScore: 7.0,
            funScore: 7.5,
            easeToLearn: 8.0,
            themingArtwork: 6.5,
            replayability: 7.0,
            justification: 'A good gateway game, but the random element can sometimes detract from the strategic experience.'
          }
        }
      }
    }),

    // Dominion reviews
    prisma.review.create({
      data: {
        gameId: games[1].id,
        playDate: new Date('2023-12-10'),
        content: 'Dominion revolutionized board gaming with its deck-building mechanics. Each game feels different due to the variety of kingdom cards.',
        reviewScores: {
          create: {
            reviewerId: reviewers[0].id,
            overallScore: 9.0,
            funScore: 9.0,
            easeToLearn: 7.0,
            themingArtwork: 6.5,
            replayability: 10.0,
            justification: 'The exceptional variety in kingdom card combinations provides nearly endless replayability.'
          }
        }
      }
    }),
    prisma.review.create({
      data: {
        gameId: games[1].id,
        playDate: new Date('2024-01-05'),
        content: 'Dominion is a masterclass in elegant game design. The mechanics are simple to learn but provide deep strategic options.',
        reviewScores: {
          create: {
            reviewerId: reviewers[2].id,
            overallScore: 8.5,
            funScore: 8.0,
            easeToLearn: 7.5,
            themingArtwork: 6.0,
            replayability: 9.5,
            justification: 'The theme is somewhat pasted on, but the gameplay is so solid that it doesn\'t matter much.'
          }
        }
      }
    }),

    // Pandemic reviews
    prisma.review.create({
      data: {
        gameId: games[2].id,
        playDate: new Date('2024-02-03'),
        content: 'Pandemic creates tense moments of cooperation as players work together to save humanity. The escalating difficulty keeps everyone engaged until the end.',
        reviewScores: {
          create: {
            reviewerId: reviewers[1].id,
            overallScore: 9.0,
            funScore: 9.0,
            easeToLearn: 7.5,
            themingArtwork: 8.0,
            replayability: 8.5,
            justification: 'The cooperative nature creates a unique gaming experience, though it can suffer from alpha player syndrome.'
          }
        }
      }
    }),
    prisma.review.create({
      data: {
        gameId: games[2].id,
        playDate: new Date('2024-02-20'),
        content: 'Pandemic remains one of the best cooperative games. The different roles give each player a unique way to contribute to the team.',
        reviewScores: {
          create: {
            reviewerId: reviewers[2].id,
            overallScore: 8.5,
            funScore: 8.5,
            easeToLearn: 7.0,
            themingArtwork: 8.0,
            replayability: 8.0,
            justification: 'The game creates memorable moments of tension and triumph. Great for families who want to work together.'
          }
        }
      }
    }),

    // Ticket to Ride reviews
    prisma.review.create({
      data: {
        gameId: games[3].id,
        playDate: new Date('2024-01-15'),
        content: 'Ticket to Ride offers accessible gameplay with just enough strategic depth. The satisfaction of completing routes is hard to beat.',
        reviewScores: {
          create: {
            reviewerId: reviewers[2].id,
            overallScore: 8.0,
            funScore: 8.5,
            easeToLearn: 9.0,
            themingArtwork: 8.0,
            replayability: 7.5,
            justification: 'Perfect for family game nights. Easy to teach with enough depth to keep gamers engaged.'
          }
        }
      }
    }),

    // Azul reviews
    prisma.review.create({
      data: {
        gameId: games[4].id,
        playDate: new Date('2024-03-01'),
        content: 'Azul combines beautiful components with elegant gameplay. The tile drafting mechanism creates interesting decisions on every turn.',
        reviewScores: {
          create: {
            reviewerId: reviewers[0].id,
            overallScore: 8.5,
            funScore: 8.0,
            easeToLearn: 8.5,
            themingArtwork: 9.5,
            replayability: 8.0,
            justification: 'The components are gorgeous and the gameplay is accessible yet deep. A modern classic.'
          }
        }
      }
    }),
    prisma.review.create({
      data: {
        gameId: games[4].id,
        playDate: new Date('2024-03-10'),
        content: 'Azul is a tactile delight with its beautiful tiles. The game scales well at different player counts and offers just the right amount of player interaction.',
        reviewScores: {
          create: {
            reviewerId: reviewers[1].id,
            overallScore: 9.0,
            funScore: 8.5,
            easeToLearn: 9.0,
            themingArtwork: 10.0,
            replayability: 8.0,
            justification: 'A visually stunning game that offers depth through simple mechanics. The indirect interaction is perfectly balanced.'
          }
        }
      }
    }),
  ]);

  console.log('Database has been seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 