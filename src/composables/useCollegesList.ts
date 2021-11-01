export interface Colleges {
  [x: string]: FilterOption[]
}
export interface FilterOption {
  text: string
  value: string
}

const collegesList = {
  bachelor: {
    文學院: [
      { text: '文學院學士班', value: 'B0' },
      { text: '中文系', value: 'B1' },
      { text: '外文系', value: 'B2' },
      { text: '歷史系', value: 'B3' },
      { text: '台文系', value: 'B5' }
    ],
    理學院: [
      { text: '數學系', value: 'C1' },
      { text: '物理系', value: 'C2' },
      { text: '化學系', value: 'C3' },
      { text: '地科系', value: 'C4' },
      { text: '理學院學士班', value: 'CZ' },
      { text: '光電系', value: 'F8' }
    ],
    管理學院: [
      { text: '會計系', value: 'H1' },
      { text: '統計系', value: 'H2' },
      { text: '工資系', value: 'H3' },
      { text: '企管系', value: 'H4' },
      { text: '交管系', value: 'H5' },
    ],
    工學院: [
      { text :'機械系', value: 'E1' },
      { text :'化工系', value: 'E3' },
      { text :'資源系', value: 'E4' },
      { text :'材料系', value: 'E5' },
      { text :'土木系', value: 'E6' },
      { text :'水利系', value: 'E8' },
      { text :'工科系', value: 'E9' },
      { text :'能源學程', value: 'F0' },
      { text :'系統系', value: 'F1' },
      { text :'航太系', value: 'F4' },
      { text :'環工系', value: 'F5' },
      { text :'測量系', value: 'F6' },
      { text :'醫工系', value: 'F9' }
    ],
    電機資訊學院: [
      { text: '電機系', value: 'E2' },
      { text: '資訊系', value: 'F7' }
    ],
    社會科學學院: [
      { text: '法律系', value: 'D2' },
      { text: '政治系', value: 'D4' },
      { text: '經濟系', value: 'D5' },
      { text: '心理系', value: 'D8' }
    ],
    規劃與設計學院: [
      { text: '建築系', value: 'E7' },
      { text: '都計系', value: 'F2' },
      { text: '工設系', value: 'F3' },
      { text: '規劃設計學院學士', value: 'FZ' }
    ],
    生物科學與科技學院: [
      { text: '生科系LS', value: 'C5' },
      { text: '生技系BBS', value: 'C6' },
    ],
    醫學院: [
      { text: '護理系', value: 'I2' },
      { text: '醫技系', value: 'I3' },
      { text: '醫學系', value: 'I5' },
      { text: '物治系', value: 'I6' },
      { text: '職治系', value: 'I7' },
      { text: '藥學系', value: 'I8' },
      { text: '牙醫系', value: 'I9' },
      { text: '醫學院 ', value: 'S0' }
    ],
    敏求智慧運算學院: [
      { text: '敏求學院學士班', value: 'J0' }
    ],
    全校不分系學士學位學程: [
      { text: '不分系學程', value: 'AN' },
      { text: '科學班', value: 'C0' },
    ]
  } as Colleges,
  master: {
    文學院: [
      { text: '中文所', value: 'K1' },
      { text: '外文所', value: 'K2' },
      { text: '歷史所', value: 'K3' },
      { text: '藝術所', value: 'K4' },
      { text: '台文所', value: 'K5' },
      { text: '考古所', value: 'K7' },
      { text: '戲劇碩士學程', value: 'K8' },
      { text: '文學院研究所', value: 'KZ' }
    ],
    理學院: [
      { text: '應數所', value: 'L1' },
      { text: '物理所', value: 'L2' },
      { text: '化學所', value: 'L3' },
      { text: '地科所', value: 'L4' },
      { text: '光電所', value: 'L7' },
      { text: '電漿所', value: 'LA' },
      { text: '理學院研究所', value: 'LZ' },
      { text: '發光二極產碩 ', value: 'VF' },
      { text: '光電科技產碩', value: 'VP' }
    ],
    工學院: [
      { text: '工程管理碩專', value: 'N0' },
      { text: '機械所', value: 'N1' },
      { text: '化工所', value: 'N3' },
      { text: '資源所', value: 'N4' },
      { text: '材料所', value: 'N5' },
      { text: '土木所', value: 'N6' },
      { text: '水利所', value: 'N8' },
      { text: '工科所', value: 'N9' },
      { text: '海事所', value: 'NA' },
      { text: '尖端碩士學程', value: 'NB' },
      { text: '自災碩士學程', value: 'NC' },
      { text: '智慧製造碩士學程', value: 'NF' },
      { text: '能源碩博學程', value: 'P0' },
      { text: '系統所', value: 'P1' },
      { text: '航太所', value: 'P4' },
      { text: '環工所', value: 'P5' },
      { text: '測量所', value: 'P6' },
      { text: '醫工所', value: 'P8' },
      { text: '民航所', value: 'Q4' },
      { text: '機械產碩 ', value: 'VQ' }
    ],
    管理學院: [
      { text: 'ＥＭＢＡ碩專', value: 'R0' },
      { text: '會計所', value: 'R1' },
      { text: '統計所', value: 'R2' },
      { text: '工資所', value: 'R3' },
      { text: '企管所', value: 'R4' },
      { text: '交管所', value: 'R5' },
      { text: '國企所', value: 'R6' },
      { text: '資管所', value: 'R7' },
      { text: '財金所', value: 'R8' },
      { text: '電管所', value: 'R9' },
      { text: '國經所', value: 'RA' },
      { text: '體健所', value: 'RB' },
      { text: 'AMBA碩士學程', value: 'RDAMBA' },
      { text: '數據所', value: 'RE' },
      { text: '管理學院', value: 'RZ' },
      { text: '財金產碩 ', value: 'VR' },
      { text: '東南亞金融產碩 ', value: 'VT' }
    ],
    醫學院: [
      { text: '生化所', value: 'S1' },
      { text: '藥理所', value: 'S2' },
      { text: '生理所', value: 'S3' },
      { text: '微免所', value: 'S4' },
      { text: '基醫所', value: 'S5' },
      { text: '臨藥科技所', value: 'S6' },
      { text: '環醫所', value: 'S7' },
      { text: '行醫所', value: 'S8' },
      { text: '臨醫所', value: 'S9' },
      { text: '神經博士學程', value: 'SA' },
      { text: '公衛碩專', value: 'SB' },
      { text: '食安所', value: 'SC' },
      { text: '分醫所', value: 'T1' },
      { text: '護理所', value: 'T2' },
      { text: '醫技所', value: 'T3' },
      { text: '口醫所', value: 'T4' },
      { text: '物治所', value: 'T6' },
      { text: '職治所', value: 'T7' },
      { text: '公衛所', value: 'T8' },
      { text: '細胞所', value: 'T9' },
      { text: '健照所', value: 'TA' },
      { text: '老年所', value: 'TC' }
    ],
    社會科學學院: [
      { text: '政經所', value: 'U1' },
      { text: '法律所', value: 'U2' },
      { text: '教育所', value: 'U3' },
      { text: '經濟所', value: 'U5' },
      { text: '心理所', value: 'U7' },
      { text: '心智應用博士學程', value: 'U8' }
    ],
    電機資訊學院: [
      { text: '電機所', value: 'N2' },
      { text: '多媒博士學程 ', value: 'ND' },
      { text: '人工智慧碩士學程 ', value: 'NE' },
      { text: '資訊所', value: 'P7' },
      { text: '製造所', value: 'P9' },
      { text: '微電所', value: 'Q1' },
      { text: '電通所', value: 'Q3' },
      { text: '醫資所', value: 'Q5' },
      { text: '南科碩專', value: 'Q6' },
      { text: '奈積碩博學程', value: 'Q7' },
      { text: '電力產碩', value: 'V6' },
      { text: '微波材料產碩 ', value: 'V8' },
      { text: '電子材料產碩 ', value: 'V9' },
      { text: '電機產碩 ', value: 'VA' },
      { text: '光材產碩 ', value: 'VB' },
      { text: '光產產碩 ', value: 'VC' },
      { text: '微波材料元件產碩 ', value: 'VD' },
      { text: '電子產碩', value: 'VE' },
      { text: '靜電保護產碩 ', value: 'VG' },
      { text: '磁性材料產碩 ', value: 'VH' },
      { text: '電機驅動產碩 ', value: 'VK' },
      { text: '積體製程產碩 ', value: 'VM' },
      { text: '微波元件產碩 ', value: 'VN' },
      { text: '先進RF產碩 ', value: 'VORF' },
      { text: '金融資訊產碩 ', value: 'VS' },
      { text: '智慧製造產碩 ', value: 'VU' },
      { text: '光電產碩 ', value: 'VV' }
    ],
    規劃與設計學院: [
      { text: '建築所', value: 'N7' },
      { text: '都計所', value: 'P2' },
      { text: '工設所', value: 'P3' },
      { text: '創意所', value: 'PA' },
      { text: '科藝碩士學程', value: 'PB' },
      { text: '規劃設計學院研究', value: 'PZ' }
    ],
    生物科學與科技學院: [
      { text: '生科所LS', value: 'L5' },
      { text: '生技所BBS', value: 'L6' },
      { text: '生訊所', value: 'Z2' },
      { text: '熱植所', value: 'Z3' },
      { text: '譯農博士學程', value: 'Z5' }
    ],
    敏求智慧運算學院: [
      { text: '敏求學院研究所', value: 'M0' },
      { text: '機器人碩士學程', value: 'NM' },
    ]
  } as Colleges
}

export const useCollegesList = () => {
  return collegesList
}