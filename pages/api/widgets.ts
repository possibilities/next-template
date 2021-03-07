import { range } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  res
    .status(200)
    .json(
      range(20).map(n => ({ wid: `widget-${n + 1}`, name: `Widget ${n + 1}` })),
    )
}
