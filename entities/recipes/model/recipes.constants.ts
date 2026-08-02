import { INGREDIENT_KEYS } from "@/entities/ingredient"
import { INSTRUMENTS_KEYS } from "@/entities/instruments"
import { CLIENTS } from "@/entities/client/model/client.constants"
import { Recipe, TREATMENT_CONSTANT } from "./recipes.types"

const [luciana, luiz, amanda] = CLIENTS

export const RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Lambedor de casca de angico',
    result: {
      id: '1',
      name: 'Lambedor de Angico',
      description: 'Xarope expectorante feito com casca de angico, água e açúcar.',
    },
    properties: ['expectorante', 'anti-inflamatória', 'cicatrizante'],
    type: INSTRUMENTS_KEYS.SUGAR,
    treatmentFor: TREATMENT_CONSTANT.EXPECTORANT,
    instruments: [INSTRUMENTS_KEYS.SUGAR],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ANGICO],
    description:
      'Lambedor tradicional do nordeste brasileiro para tratamento de doenças respiratórias, como bronquite e asma.',
    preparation:
      'Coloque de 2 a 3 cascas de angico em meio litro de água com açúcar. Leve ao fogo até atingir a consistência de mel. Ingira 1 colher de sopa três vezes ao dia até os sintomas desaparecerem.',
    clients: [luiz],
  },
  {
    id: '2',
    name: 'Chá de folhas de Guiné',
    result: {
      id: '2',
      name: 'Chá de Guiné',
      description: 'Chá anti-inflamatório e analgésico feito com folhas de Guiné.',
    },
    properties: ['anti-inflamatória', 'analgésica', 'antimicrobiana', 'sedativa'],
    type: INSTRUMENTS_KEYS.TEA,
    treatmentFor: TREATMENT_CONSTANT.ARTHRITIS,
    instruments: [INSTRUMENTS_KEYS.TEA],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.GUINE],
    description:
      'Chá indicado para o alívio da dor e rigidez causadas pela artrite, feito com folhas secas de Guiné.',
    preparation:
      'Aqueça a água até o início da fervura, sem deixar ferver totalmente. Desligue o fogo, coloque as folhas de Guiné e derrame a água quente sobre elas. Tampe e deixe em infusão por 15 minutos. Coe antes de consumir. Dosagem: 1 a 2 xícaras por dia.',
    clients: [luciana],
  },
  {
    id: '3',
    name: 'Chá de jurubeba',
    result: {
      id: '3',
      name: 'Chá de Jurubeba',
      description: 'Chá digestivo e cicatrizante feito com raiz de jurubeba.',
    },
    properties: ['cicatrizante', 'diurético', 'digestivo'],
    type: INSTRUMENTS_KEYS.TEA,
    treatmentFor: TREATMENT_CONSTANT.ARTHRITIS,
    instruments: [INSTRUMENTS_KEYS.TEA],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.JURUBEBA],
    description:
      'Chá usado no alívio de dores articulares, feito com a raiz triturada de jurubeba.',
    preparation:
      'Coloque a raiz triturada de jurubeba na água. Leve ao fogo e ferva por 10 a 15 minutos. Desligue o fogo, tampe e deixe repousar por mais 5 minutos. Coe antes de consumir.',
    clients: [luciana],
  },
  {
    id: '4',
    name: 'Chá de casca de jatobá',
    result: {
      id: '4',
      name: 'Chá de Jatobá',
      description: 'Chá anti-inflamatório e expectorante feito com casca de jatobá.',
    },
    properties: ['anti-inflamatória', 'expectorante'],
    type: INSTRUMENTS_KEYS.TEA,
    treatmentFor: TREATMENT_CONSTANT.ARTHRITIS,
    instruments: [INSTRUMENTS_KEYS.TEA],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.JATOBA],
    description: 'Chá usado tradicionalmente no alívio de dores e inflamações articulares.',
    preparation:
      'Deixe 2 cascas de jatobá de molho em 1 litro de água. Ingira meio copo duas vezes ao dia até que os sintomas desapareçam.',
    clients: [luciana],
  },
  {
    id: '5',
    name: 'Lambedor de assa-peixe-branco',
    result: {
      id: '5',
      name: 'Lambedor de Assa-peixe',
      description: 'Xarope expectorante feito com folhas de assa-peixe-branco.',
    },
    properties: ['antioxidante', 'expectorante', 'anti-inflamatória'],
    type: INSTRUMENTS_KEYS.SUGAR,
    treatmentFor: TREATMENT_CONSTANT.BRONCHITIS,
    instruments: [INSTRUMENTS_KEYS.SUGAR],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ASSA_PEIXE],
    description:
      'Lambedor indicado para bronquite, gripe e tosse, com propriedades anti-inflamatórias.',
    preparation:
      'Cozinhe as folhas de assa-peixe-branco com água e açúcar até atingir consistência de xarope.',
    clients: [luiz],
  },
  {
    id: '6',
    name: 'Cataplasma de erva-de-santa-maria',
    result: {
      id: '6',
      name: 'Cataplasma de Erva-de-santa-maria',
      description: 'Pasta anti-inflamatória e expectorante feita com folhas de erva-de-santa-maria.',
    },
    properties: [
      'antiparasitária (vermífuga)',
      'antimicrobiana',
      'antifúngica',
      'anti-inflamatória',
      'expectorante',
      'digestiva',
    ],
    type: INSTRUMENTS_KEYS.CATAPLASM,
    treatmentFor: TREATMENT_CONSTANT.BRONCHITIS,
    instruments: [INSTRUMENTS_KEYS.CATAPLASM],
    ingredients: [INGREDIENT_KEYS.OIL, INGREDIENT_KEYS.MASTRUCO, INGREDIENT_KEYS.WATER],
    description:
      'Cataplasma de ação anti-inflamatória e expectorante, reduz tosse e outros sintomas de bronquite.',
    preparation:
      'Amasse as folhas frescas de erva-de-santa-maria até formar uma pasta, misturando com um pouco de óleo e água. Aplique diretamente sobre o local dolorido, podendo usar gaze para proteger a área.',
    clients: [luiz],
  },
  {
    id: '7',
    name: 'Garrafada de cajueiro, aroeira-mansa e barbatimão',
    result: {
      id: '7',
      name: 'Garrafada Cicatrizante',
      description: 'Garrafada macerada em álcool com cajueiro, aroeira-mansa e barbatimão.',
    },
    properties: ['antimicrobiana', 'gastroprotetora', 'adstringente', 'cicatrizante'],
    type: INSTRUMENTS_KEYS.BOTTLE,
    treatmentFor: TREATMENT_CONSTANT.HEALING,
    instruments: [INSTRUMENTS_KEYS.BOTTLE],
    ingredients: [
      INGREDIENT_KEYS.BARBATIMAO,
      INGREDIENT_KEYS.AROEIRA,
      INGREDIENT_KEYS.CAJUEIRO,
      INGREDIENT_KEYS.ALCOHOL,
    ],
    description:
      'Garrafada indicada para cicatrização rápida de ferimentos e inchaços na pele. Não vinculada a um cliente específico.',
    preparation:
      'Triture levemente as cascas secas de barbatimão, aroeira e cajueiro. Coloque em um recipiente de vidro e adicione álcool até cobrir as cascas. Feche o frasco e deixe macerar por 15 dias, agitando diariamente. Filtre o líquido e aplique na lesão 2 vezes ao dia.',
    clients: [], // "Qualquer um" — receita não vinculada a um cliente específico
  },
  {
    id: '8',
    name: "Chá de casca d'anta",
    result: {
      id: '8',
      name: "Chá de Casca d'Anta",
      description: "Chá anti-inflamatório e antiulcerativo feito com casca d'anta.",
    },
    properties: ['anti-inflamatória', 'antinociceptiva', 'antiulcerativa'],
    type: INSTRUMENTS_KEYS.TEA,
    treatmentFor: TREATMENT_CONSTANT.GASTRITIS,
    instruments: [INSTRUMENTS_KEYS.TEA],
    ingredients: [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.CASCA_DE_ANTA],
    description: 'Chá indicado para o alívio de sintomas de gastrite.',
    preparation:
      "Coloque 1 colher de sopa de casca d'anta em 500ml de água filtrada. Leve ao fogo e ferva por 8 a 10 minutos. Desligue o fogo, tampe e deixe repousar por mais 10 minutos. Coe antes de consumir; tome morno ou frio.",
    clients: [amanda],
  },
  {
    id: '9',
    name: 'Cataplasma de açafrão-da-terra',
    result: {
      id: '9',
      name: 'Cataplasma de Açafrão-da-terra',
      description: 'Pasta anti-inflamatória feita com açafrão-da-terra e gengibre.',
    },
    properties: ['anti-inflamatória', 'antioxidante', 'hepatoprotetora'],
    type: INSTRUMENTS_KEYS.CATAPLASM,
    treatmentFor: TREATMENT_CONSTANT.ARTHRITIS,
    instruments: [INSTRUMENTS_KEYS.CATAPLASM],
    ingredients: [INGREDIENT_KEYS.ACAFRAO_DA_TERRA, INGREDIENT_KEYS.GENGIBRE, INGREDIENT_KEYS.WATER],
    description:
      'Cataplasma anti-inflamatória para dores articulares, feita com pó de cúrcuma e gengibre.',
    preparation:
      'Misture o pó de cúrcuma e o gengibre em partes iguais. Adicione água aos poucos até formar uma pasta consistente. Coloque a pasta em uma gaze ou algodão e aplique na área afetada pela dor.',
    clients: [luciana],
  },
  {
    id: '10',
    name: 'Pó de quina-do-cerrado',
    result: {
      id: '10',
      name: 'Pó de Quina-do-Cerrado',
      description: 'Pó digestivo e cicatrizante feito com casca de quina-do-cerrado.',
    },
    properties: ['antitumoral', 'anti-inflamatória', 'antioxidante', 'antiviral'],
    type: INSTRUMENTS_KEYS.POWDER,
    treatmentFor: TREATMENT_CONSTANT.GASTRITIS,
    instruments: [INSTRUMENTS_KEYS.POWDER],
    ingredients: [INGREDIENT_KEYS.QUINA_DO_CERRADO],
    description: 'Pó indicado para o alívio de sintomas de gastrite, com ação digestiva.',
    preparation:
      'Seque a casca da Quina-do-Cerrado ao sol por 3 dias e triture no pilão até obter um pó fino. Misture com um pouco de óleo (opcional) e armazene em recipiente fechado, protegido da luz. Use diluído em água, chá ou mel, 1 vez ao dia.',
    clients: [amanda],
  },
]
