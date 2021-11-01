import { req } from './index'
import { ExperienceTypes } from '@/types/index'

interface AnalyzeParam {
  colleges: {
    bachelor: string[]
    master: string[]
  }
  departments: string[]
  categories: ExperienceTypes[]
  yearStart: string
  yearEnd: string
}

export const analyze = ({
  colleges,
  departments,
  categories,
  yearStart,
  yearEnd
}: AnalyzeParam) => {
  return req.post('/backstage/analyze-categories', {
    colleges,
    departments,
    categories,
    yearStart,
    yearEnd
  })
}
