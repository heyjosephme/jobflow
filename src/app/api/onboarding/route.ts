// app/api/onboarding/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate user is authenticated
    // const user = await validateUser(request)
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Save onboarding data to your database
    // await db.user.update({
    //   where: { id: user.id },
    //   data: {
    //     ...data,
    //     hasCompletedOnboarding: true
    //   }
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}
