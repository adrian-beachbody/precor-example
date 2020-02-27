import path from 'path'
import express, { Request, Response } from 'express'
import { NOT_FOUND } from 'http-status-codes'
import { ExpressMiddleware } from 'server/types'
const month = 1000 * 60 * 60 * 24 * 30 // eslint-disable-line no-magic-numbers

export function serveAssets(outputPath: string) {
  return express.static(outputPath, {
    maxAge: process.env.NODE_ENV === 'production' ? month : 0,
  })
}

export function serverStaticCache(srcPath: string): ExpressMiddleware {
  return (req: Request, res: Response): void => {
    res.sendFile(
      path.join(srcPath, 'server', req.path),
      {
        maxAge: process.env.NODE_ENV === 'production' ? month : 0,
        etag: false,
        lastModified: false,
      },
      function onError(err: Error): void {
        if (err) {
          res.status(NOT_FOUND).send('Not Found')
        }
      }
    )
  }
}
