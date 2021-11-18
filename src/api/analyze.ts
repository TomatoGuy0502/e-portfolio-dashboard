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

interface AnalyzeInfo {
  name: string
  count: number
}

interface AnalyzeResponse {
  experiences: AnalyzeInfo[],
  tags: AnalyzeInfo[],
}

export const analyze = ({
  colleges,
  departments,
  categories,
  yearStart,
  yearEnd
}: AnalyzeParam) => {
  return req.post<AnalyzeResponse>('/backstage/analyze-categories', {
    colleges,
    departments,
    categories,
    yearStart,
    yearEnd
  })
}
