import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { URL } from 'url'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const type = searchParams.get('type')
    const playerId = searchParams.get('playerId')
    console.log('[PARAMS]', type, playerId)

    const { userId } = auth()
    if (!userId) {
      return new Response('User not found', { status: 401 })
    }

    if (!type || !playerId) {
      return new Response('Missing parameters', { status: 400 })
    }

    const game = await prisma.game.findFirst({
      where: {
        clerkId: userId,
      },
      include: {
        Players: true,
      },
    })

    if (!game) {
      return new Response('Game not found', { status: 404 })
    }

    const player = await prisma.player.findFirst({
      where: {
        id: playerId,
      },
    })

    if (!player) {
      return new Response('Player not found', { status: 404 })
    }

    if (player.questionValue > 1) {
      return new Response('You must pick Dare now', { status: 400 })
    }

    const assignedCards = await prisma.assignedCard.findMany({
      where: {
        gameId: game.id,
      },
    })

    const allCards = await prisma.card.findMany({
      where: {
        collectionId: game.collectionId,
        id: {
          notIn: assignedCards.map((card) => card.cardId),
        },
      },
    })

    if (allCards.length <= 0) {
      const response = {
        id: '1',
        type: `Gratulacje! \n Koniec kart `,
        collectionId: 'test',
        amount: 1,
        content: 'Wykorzystałeś wszystkie karty. Dzięki za gre!',
        createdAt: new Date(),
        updatedAt: new Date(),
        punishment: 0,
      }
      return new Response(JSON.stringify(response), { status: 203 })
    }

    const remainingCards = await prisma.card.findMany({
      where: {
        type: type,
        collectionId: game.collectionId,
        amount: {
          gte: 0,
        },
        id: {
          notIn: assignedCards.map((card) => card.cardId),
        },
      },
    })

    if (remainingCards.length <= 0) {
      let response
      if (type === 'Prawda') {
        response = {
          id: '1',
          type: `Koniec kart Prawdy`,
          collectionId: 'test',
          amount: 1,
          content:
            'wykorzystałeś wszystkie karty tego typu. Teraz Czas na Wyzawania',
          createdAt: new Date(),
          updatedAt: new Date(),
          punishment: 0,
        }
      } else {
        response = {
          id: '1',
          type: `Koniec kart Wyzwania`,
          collectionId: 'test',
          amount: 1,
          content:
            'wykorzystałeś wszystkie karty tego typu. Teraz czas na Prawdę',
          createdAt: new Date(),
          updatedAt: new Date(),
          punishment: 1,
        }
      }
      return new Response(JSON.stringify(response), { status: 203 })
    }

    const card = await prisma.card.findFirst({
      where: {
        type: type,
        collectionId: game.collectionId,
        amount: {
          gte: 0,
        },
        id: {
          notIn: assignedCards.map((card) => card.cardId),
        },
      },
    })

    if (!card) {
      return new Response('No cards left', { status: 400 })
    }

    const response = await prisma.assignedCard.create({
      data: {
        cardId: card.id,
        gameId: game.id,
        playerId: player.id,
      },
    })
    return NextResponse.json(card)
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong!', { status: 500 })
  }
}
