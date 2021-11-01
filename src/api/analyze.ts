import { req } from './index'
import { ExperienceTypes } from '@/types/index'

interface AnalyzeParam {
  colleges: {
    bachelor: string[]
    master: string[]
  }
  departments: string[]
  categories: ExperienceTypes[]
  dateStart?: string
  dateEnd?: string
}

export const analyze = ({
  colleges,
  departments,
  categories,
  dateStart = new Date().toISOString(),
  dateEnd = new Date().toISOString()
}: AnalyzeParam) => {
  return req.post('/backstage/analyze-categories', {
    colleges,
    departments,
    categories,
    dateStart,
    dateEnd
  })
}
