export const TAGS = [
  { label: 'Grão Direto', code: 'GRAO_DIRETO' },
  { label: 'tecnologia', code: 'TECNOLOGIA' },
  { label: 'agronegócio', code: 'AGRONEGOCIO' },
  { label: 'CI/CD', code: 'CICD' },
  { label: 'devops', code: 'DEVOPS' },
  { label: 'agilidade', code: 'AGILIDADE' },
  { label: 'NoSQL', code: 'NOSQL' },
  { label: 'banco de dados', code: 'BANCO_DE_DADOS' },
  { label: 'escalabilidade', code: 'ESCALABILIDADE' },
  { label: 'Kubernetes', code: 'KUBERNETES' },
  { label: 'contêineres', code: 'CONTEINERES' },
  { label: 'orquestração', code: 'ORQUESTRACAO' },
  { label: 'serverless', code: 'SERVERLESS' },
  { label: 'segurança', code: 'SEGURANCA' },
  { label: 'cloud', code: 'CLOUD' },
  { label: 'colaboração', code: 'COLABORACAO' },
  { label: 'times distribuídos', code: 'TIMES_DISTRIBUIDOS' },
  { label: 'frontend', code: 'FRONTEND' },
  { label: 'frameworks', code: 'FRAMEWORKS' },
  { label: 'React', code: 'REACT' },
  { label: 'inovação', code: 'INOVACAO' },
] as const;

export type TagCode = (typeof TAGS)[number]['code'];
export type TagLabel = (typeof TAGS)[number]['label'];

export const tagLabelToCode = (label: string): TagCode | undefined =>
  TAGS.find((t) => t.label === label)?.code;
