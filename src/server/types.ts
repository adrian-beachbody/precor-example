import { Request, Response, NextFunction } from 'express'

export interface ServerPaths {
  clientBuild: string
  assets: string
  src: string
  loadableStatsFile: string
}

export interface ExpressMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}
