'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function DashboardTest() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test dashboard with Shadcn components.</p>
          <Button>Test Button</Button>
        </CardContent>
      </Card>
    </div>
  )
}

