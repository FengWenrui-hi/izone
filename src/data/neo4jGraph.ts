export type EntityLabelKr =
  | '인물'
  | '소속사'
  | '아이돌그룹'
  | '유닛'
  | '해체후활동';

export type RelationshipLabelKr =
  | '소속되었다'
  | '재데뷔하였다'
  | '참여하였다'
  | '출연하였다'
  | '활동했었다'
  | '관리된다';

export interface Neo4jNodeProperties {
  id: string;
  name: string;
  데뷔년도?: number;
  장르?: string;
}

export interface RawNeo4jNode {
  type: 'node';
  id: string;
  labels: EntityLabelKr[];
  properties: Neo4jNodeProperties;
}

export interface RawNeo4jRelationship {
  type: 'relationship';
  id: string;
  label: RelationshipLabelKr;
  start: {
    id: string;
    labels: EntityLabelKr[];
    properties: Neo4jNodeProperties;
  };
  end: {
    id: string;
    labels: EntityLabelKr[];
    properties: Neo4jNodeProperties;
  };
}

export const RAW_NEO4J_EXPORT = `{"type":"node","id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}}
{"type":"node","id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}}
{"type":"node","id":"2","labels":["인물"],"properties":{"name":"강혜원","id":"C03"}}
{"type":"node","id":"3","labels":["인물"],"properties":{"name":"최예나","id":"C04"}}
{"type":"node","id":"4","labels":["인물"],"properties":{"name":"이채연","id":"C05"}}
{"type":"node","id":"5","labels":["인물"],"properties":{"name":"김채원","id":"C06"}}
{"type":"node","id":"6","labels":["인물"],"properties":{"name":"김민주","id":"C07"}}
{"type":"node","id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}}
{"type":"node","id":"8","labels":["인물"],"properties":{"name":"혼다 히토미","id":"C09"}}
{"type":"node","id":"9","labels":["인물"],"properties":{"name":"조유리","id":"C10"}}
{"type":"node","id":"10","labels":["인물"],"properties":{"name":"안유진","id":"C11"}}
{"type":"node","id":"11","labels":["인물"],"properties":{"name":"장원영","id":"C12"}}
{"type":"node","id":"12","labels":["소속사"],"properties":{"name":"울림 엔터테인먼트","id":"E01"}}
{"type":"node","id":"13","labels":["소속사"],"properties":{"name":"A M  엔터테인먼트","id":"E02"}}
{"type":"node","id":"14","labels":["소속사"],"properties":{"name":"8D 엔터테인먼트","id":"E03"}}
{"type":"node","id":"15","labels":["소속사"],"properties":{"name":"위에화 엔터테인먼트","id":"E04"}}
{"type":"node","id":"16","labels":["소속사"],"properties":{"name":"WM 엔터테인먼트","id":"E05"}}
{"type":"node","id":"17","labels":["소속사"],"properties":{"name":"스타쉽엔터테인먼트","id":"E06"}}
{"type":"node","id":"18","labels":["소속사"],"properties":{"name":"쏘스뮤직(하이브)","id":"E07"}}
{"type":"node","id":"19","labels":["소속사"],"properties":{"name":"iNCODE","id":"E08"}}
{"type":"node","id":"20","labels":["소속사"],"properties":{"name":"주식회사Mercury","id":"E09"}}
{"type":"node","id":"21","labels":["소속사"],"properties":{"name":"주식회사DH","id":"E10"}}
{"type":"node","id":"22","labels":["소속사"],"properties":{"name":"Peace 엔터테인먼트","id":"E11"}}
{"type":"node","id":"23","labels":["소속사"],"properties":{"name":"알비더블유","id":"E12"}}
{"type":"node","id":"24","labels":["소속사"],"properties":{"name":"Peace 터테인먼트","id":"E13"}}
{"type":"node","id":"25","labels":["소속사"],"properties":{"name":"매니지먼트 숲","id":"E14"}}
{"type":"node","id":"26","labels":["소속사"],"properties":{"name":"TWIN PLANET","id":"E15"}}
{"type":"node","id":"27","labels":["아이돌그룹"],"properties":{"데뷔년도":2021,"name":"IVE","id":"G01"}}
{"type":"node","id":"28","labels":["아이돌그룹"],"properties":{"데뷔년도":2022,"name":"LE SSERAFIM","id":"G02"}}
{"type":"node","id":"29","labels":["아이돌그룹"],"properties":{"데뷔년도":2024,"name":"SAY MY NAME","id":"G03"}}
{"type":"node","id":"30","labels":["아이돌그룹"],"properties":{"데뷔년도":2013,"name":"HKT48","id":"G04"}}
{"type":"node","id":"31","labels":["아이돌그룹"],"properties":{"데뷔년도":2006,"name":"AKB48","id":"G05"}}
{"type":"node","id":"32","labels":["유닛"],"properties":{"name":"귀를 기울이면 2조","id":"U01"}}
{"type":"node","id":"33","labels":["유닛"],"properties":{"name":"너무너무너무 1조","id":"U02"}}
{"type":"node","id":"34","labels":["유닛"],"properties":{"name":"너무너무너무 2조","id":"U03"}}
{"type":"node","id":"35","labels":["유닛"],"properties":{"name":"우아하게 1조","id":"U04"}}
{"type":"node","id":"36","labels":["유닛"],"properties":{"name":"붐바야 2조","id":"U05"}}
{"type":"node","id":"37","labels":["해체후활동"],"properties":{"장르":"예능","name":"ロクいち！福岡","id":"A01"}}
{"type":"node","id":"38","labels":["해체후활동"],"properties":{"장르":"예능","name":"문명특급","id":"A02"}}
{"type":"node","id":"39","labels":["해체후활동"],"properties":{"장르":"화보","name":"INDEED 잡지 Vol 12","id":"A03"}}
{"type":"node","id":"40","labels":["해체후활동"],"properties":{"장르":"예능","name":"クイズTHE違和感","id":"A04"}}
{"type":"node","id":"41","labels":["해체후활동"],"properties":{"장르":"라디오","name":"전효성의 꿈꾸는 라디오","id":"A05"}}
{"type":"node","id":"42","labels":["인물"],"properties":{"name":"혼다 히토미","id":"[ID-NUMBER]"}}
{"type":"relationship","id":"1152930300699869184","label":"소속되었다","start":{"id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}},"end":{"id":"12","labels":["소속사"],"properties":{"name":"울림 엔터테인먼트","id":"E01"}}}
{"type":"relationship","id":"1155182100513554432","label":"소속되었다","start":{"id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}},"end":{"id":"23","labels":["소속사"],"properties":{"name":"알비더블유","id":"E12"}}}
{"type":"relationship","id":"1152932499723124736","label":"참여하였다","start":{"id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}},"end":{"id":"34","labels":["유닛"],"properties":{"name":"너무너무너무 2조","id":"U03"}}}
{"type":"relationship","id":"1152933599234752512","label":"출연하였다","start":{"id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}},"end":{"id":"39","labels":["해체후활동"],"properties":{"장르":"화보","name":"INDEED 잡지 Vol 12","id":"A03"}}}
{"type":"relationship","id":"1152934698746380288","label":"재데뷔하였다","start":{"id":"0","labels":["인물"],"properties":{"name":"권은비","id":"C01"}},"end":{"id":"28","labels":["아이돌그룹"],"properties":{"데뷔년도":2022,"name":"LE SSERAFIM","id":"G02"}}}
{"type":"relationship","id":"1152930300699869185","label":"소속되었다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"13","labels":["소속사"],"properties":{"name":"A M  엔터테인먼트","id":"E02"}}}
{"type":"relationship","id":"1152932499723124737","label":"참여하였다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"34","labels":["유닛"],"properties":{"name":"너무너무너무 2조","id":"U03"}}}
{"type":"relationship","id":"1152933599234752513","label":"출연하였다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"37","labels":["해체후활동"],"properties":{"장르":"예능","name":"ロクいち！福岡","id":"A01"}}}
{"type":"relationship","id":"1155185399048437761","label":"출연하였다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"40","labels":["해체후활동"],"properties":{"장르":"예능","name":"クイズTHE違和感","id":"A04"}}}
{"type":"relationship","id":"1152935798258008065","label":"활동했었다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"30","labels":["아이돌그룹"],"properties":{"데뷔년도":2013,"name":"HKT48","id":"G04"}}}
{"type":"relationship","id":"1155187598071693313","label":"활동했었다","start":{"id":"1","labels":["인물"],"properties":{"name":"미야와키 사쿠라","id":"C02"}},"end":{"id":"31","labels":["아이돌그룹"],"properties":{"데뷔년도":2006,"name":"AKB48","id":"G05"}}}
{"type":"relationship","id":"1152930300699869186","label":"소속되었다","start":{"id":"2","labels":["인물"],"properties":{"name":"강혜원","id":"C03"}},"end":{"id":"14","labels":["소속사"],"properties":{"name":"8D 엔터테인먼트","id":"E03"}}}
{"type":"relationship","id":"1157433900327239682","label":"소속되었다","start":{"id":"2","labels":["인물"],"properties":{"name":"강혜원","id":"C03"}},"end":{"id":"22","labels":["소속사"],"properties":{"name":"Peace 엔터테인먼트","id":"E11"}}}
{"type":"relationship","id":"1155182100513554434","label":"소속되었다","start":{"id":"2","labels":["인물"],"properties":{"name":"강혜원","id":"C03"}},"end":{"id":"24","labels":["소속사"],"properties":{"name":"Peace 터테인먼트","id":"E13"}}}
{"type":"relationship","id":"1152932499723124738","label":"참여하였다","start":{"id":"2","labels":["인물"],"properties":{"name":"강혜원","id":"C03"}},"end":{"id":"36","labels":["유닛"],"properties":{"name":"붐바야 2조","id":"U05"}}}
{"type":"relationship","id":"1152930300699869187","label":"소속되었다","start":{"id":"3","labels":["인물"],"properties":{"name":"최예나","id":"C04"}},"end":{"id":"15","labels":["소속사"],"properties":{"name":"위에화 엔터테인먼트","id":"E04"}}}
{"type":"relationship","id":"1152932499723124739","label":"참여하였다","start":{"id":"3","labels":["인물"],"properties":{"name":"최예나","id":"C04"}},"end":{"id":"33","labels":["유닛"],"properties":{"name":"너무너무너무 1조","id":"U02"}}}
{"type":"relationship","id":"1152933599234752515","label":"출연하였다","start":{"id":"3","labels":["인물"],"properties":{"name":"최예나","id":"C04"}},"end":{"id":"38","labels":["해체후활동"],"properties":{"장르":"예능","name":"문명특급","id":"A02"}}}
{"type":"relationship","id":"1155185399048437763","label":"출연하였다","start":{"id":"3","labels":["인물"],"properties":{"name":"최예나","id":"C04"}},"end":{"id":"41","labels":["해체후활동"],"properties":{"장르":"라디오","name":"전효성의 꿈꾸는 라디오","id":"A05"}}}
{"type":"relationship","id":"1152930300699869188","label":"소속되었다","start":{"id":"4","labels":["인물"],"properties":{"name":"이채연","id":"C05"}},"end":{"id":"16","labels":["소속사"],"properties":{"name":"WM 엔터테인먼트","id":"E05"}}}
{"type":"relationship","id":"1152932499723124740","label":"참여하였다","start":{"id":"4","labels":["인물"],"properties":{"name":"이채연","id":"C05"}},"end":{"id":"34","labels":["유닛"],"properties":{"name":"너무너무너무 2조","id":"U03"}}}
{"type":"relationship","id":"1152933599234752516","label":"출연하였다","start":{"id":"4","labels":["인물"],"properties":{"name":"이채연","id":"C05"}},"end":{"id":"39","labels":["해체후활동"],"properties":{"장르":"화보","name":"INDEED 잡지 Vol 12","id":"A03"}}}
{"type":"relationship","id":"1155185399048437764","label":"출연하였다","start":{"id":"4","labels":["인물"],"properties":{"name":"이채연","id":"C05"}},"end":{"id":"41","labels":["해체후활동"],"properties":{"장르":"라디오","name":"전효성의 꿈꾸는 라디오","id":"A05"}}}
{"type":"relationship","id":"1152932499723124741","label":"참여하였다","start":{"id":"5","labels":["인물"],"properties":{"name":"김채원","id":"C06"}},"end":{"id":"35","labels":["유닛"],"properties":{"name":"우아하게 1조","id":"U04"}}}
{"type":"relationship","id":"1152933599234752517","label":"출연하였다","start":{"id":"5","labels":["인물"],"properties":{"name":"김채원","id":"C06"}},"end":{"id":"40","labels":["해체후활동"],"properties":{"장르":"예능","name":"クイズTHE違和感","id":"A04"}}}
{"type":"relationship","id":"1152934698746380293","label":"재데뷔하였다","start":{"id":"5","labels":["인물"],"properties":{"name":"김채원","id":"C06"}},"end":{"id":"28","labels":["아이돌그룹"],"properties":{"데뷔년도":2022,"name":"LE SSERAFIM","id":"G02"}}}
{"type":"relationship","id":"1152932499723124742","label":"참여하였다","start":{"id":"6","labels":["인물"],"properties":{"name":"김민주","id":"C07"}},"end":{"id":"34","labels":["유닛"],"properties":{"name":"너무너무너무 2조","id":"U03"}}}
{"type":"relationship","id":"1152930300699869191","label":"소속되었다","start":{"id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}},"end":{"id":"26","labels":["소속사"],"properties":{"name":"TWIN PLANET","id":"E15"}}}
{"type":"relationship","id":"1152932499723124743","label":"참여하였다","start":{"id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}},"end":{"id":"32","labels":["유닛"],"properties":{"name":"귀를 기울이면 2조","id":"U01"}}}
{"type":"relationship","id":"1152933599234752519","label":"출연하였다","start":{"id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}},"end":{"id":"38","labels":["해체후활동"],"properties":{"장르":"예능","name":"문명특급","id":"A02"}}}
{"type":"relationship","id":"1155185399048437767","label":"출연하였다","start":{"id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}},"end":{"id":"40","labels":["해체후활동"],"properties":{"장르":"예능","name":"クイズTHE違和感","id":"A04"}}}
{"type":"relationship","id":"1152935798258008071","label":"활동했었다","start":{"id":"7","labels":["인물"],"properties":{"name":"야부키 나코","id":"C08"}},"end":{"id":"30","labels":["아이돌그룹"],"properties":{"데뷔년도":2013,"name":"HKT48","id":"G04"}}}
{"type":"relationship","id":"1152932499723124744","label":"참여하였다","start":{"id":"8","labels":["인물"],"properties":{"name":"혼다 히토미","id":"C09"}},"end":{"id":"33","labels":["유닛"],"properties":{"name":"너무너무너무 1조","id":"U02"}}}
{"type":"relationship","id":"1152934698746380296","label":"재데뷔하였다","start":{"id":"8","labels":["인물"],"properties":{"name":"혼다 히토미","id":"C09"}},"end":{"id":"29","labels":["아이돌그룹"],"properties":{"데뷔년도":2024,"name":"SAY MY NAME","id":"G03"}}}
{"type":"relationship","id":"1152935798258008072","label":"활동했었다","start":{"id":"8","labels":["인물"],"properties":{"name":"혼다 히토미","id":"C09"}},"end":{"id":"31","labels":["아이돌그룹"],"properties":{"데뷔년도":2006,"name":"AKB48","id":"G05"}}}
{"type":"relationship","id":"1155182100513554441","label":"소속되었다","start":{"id":"9","labels":["인물"],"properties":{"name":"조유리","id":"C10"}},"end":{"id":"24","labels":["소속사"],"properties":{"name":"Peace 터테인먼트","id":"E13"}}}
{"type":"relationship","id":"1152930300699869193","label":"소속되었다","start":{"id":"9","labels":["인물"],"properties":{"name":"조유리","id":"C10"}},"end":{"id":"25","labels":["소속사"],"properties":{"name":"매니지먼트 숲","id":"E14"}}}
{"type":"relationship","id":"1152932499723124746","label":"참여하였다","start":{"id":"10","labels":["인물"],"properties":{"name":"안유진","id":"C11"}},"end":{"id":"33","labels":["유닛"],"properties":{"name":"너무너무너무 1조","id":"U02"}}}
{"type":"relationship","id":"1152934698746380298","label":"재데뷔하였다","start":{"id":"10","labels":["인물"],"properties":{"name":"안유진","id":"C11"}},"end":{"id":"27","labels":["아이돌그룹"],"properties":{"데뷔년도":2021,"name":"IVE","id":"G01"}}}
{"type":"relationship","id":"1152932499723124747","label":"참여하였다","start":{"id":"11","labels":["인물"],"properties":{"name":"장원영","id":"C12"}},"end":{"id":"33","labels":["유닛"],"properties":{"name":"너무너무너무 1조","id":"U02"}}}
{"type":"relationship","id":"1152934698746380299","label":"재데뷔하였다","start":{"id":"11","labels":["인물"],"properties":{"name":"장원영","id":"C12"}},"end":{"id":"27","labels":["아이돌그룹"],"properties":{"데뷔년도":2021,"name":"IVE","id":"G01"}}}
{"type":"relationship","id":"1152931400211496987","label":"관리된다","start":{"id":"27","labels":["아이돌그룹"],"properties":{"데뷔년도":2021,"name":"IVE","id":"G01"}},"end":{"id":"17","labels":["소속사"],"properties":{"name":"스타쉽엔터테인먼트","id":"E06"}}}
{"type":"relationship","id":"1152931400211496988","label":"관리된다","start":{"id":"28","labels":["아이돌그룹"],"properties":{"데뷔년도":2022,"name":"LE SSERAFIM","id":"G02"}},"end":{"id":"18","labels":["소속사"],"properties":{"name":"쏘스뮤직(하이브)","id":"E07"}}}
{"type":"relationship","id":"1152931400211496989","label":"관리된다","start":{"id":"29","labels":["아이돌그룹"],"properties":{"데뷔년도":2024,"name":"SAY MY NAME","id":"G03"}},"end":{"id":"19","labels":["소속사"],"properties":{"name":"iNCODE","id":"E08"}}}
{"type":"relationship","id":"1152931400211496990","label":"관리된다","start":{"id":"30","labels":["아이돌그룹"],"properties":{"데뷔년도":2013,"name":"HKT48","id":"G04"}},"end":{"id":"20","labels":["소속사"],"properties":{"name":"주식회사Mercury","id":"E09"}}}
{"type":"relationship","id":"1152931400211496991","label":"관리된다","start":{"id":"31","labels":["아이돌그룹"],"properties":{"데뷔년도":2006,"name":"AKB48","id":"G05"}},"end":{"id":"21","labels":["소속사"],"properties":{"name":"주식회사DH","id":"E10"}}}
{"type":"relationship","id":"1152933599234752554","label":"출연하였다","start":{"id":"42","labels":["인물"],"properties":{"name":"혼다 히토미","id":"[ID-NUMBER]"}},"end":{"id":"40","labels":["해체후활동"],"properties":{"장르":"예능","name":"クイズTHE違和感","id":"A04"}}}`;

export const ENTITY_META: Record<
  EntityLabelKr,
  {
    en: string;
    kr: string;
    description: string;
    color: string;
    stroke: string;
    bg: string;
    text: string;
  }
> = {
  인물: {
    en: 'People',
    kr: '인물',
    description: 'Former IZ*ONE members documented in the exported graph',
    color: '#D86C8A',
    stroke: '#A6415E',
    bg: '#FBECEF',
    text: '#8D2D49',
  },
  소속사: {
    en: 'Entertainment Agencies',
    kr: '소속사',
    description: 'Agencies affiliated with members or managing idol groups',
    color: '#6C7FC0',
    stroke: '#445594',
    bg: '#EDF0FC',
    text: '#394985',
  },
  아이돌그룹: {
    en: 'Idol Groups',
    kr: '아이돌그룹',
    description: 'Pre-debut and post-disbandment idol groups',
    color: '#B479B8',
    stroke: '#7E4B82',
    bg: '#F5ECF6',
    text: '#6A386E',
  },
  유닛: {
    en: 'Produce 48 Units',
    kr: '유닛',
    description: 'Competition performance units formed during Produce 48',
    color: '#D59C5C',
    stroke: '#96652E',
    bg: '#FAF1E4',
    text: '#7D511E',
  },
  해체후활동: {
    en: 'Post-disbandment Activities',
    kr: '해체후활동',
    description: 'Documented television, radio, and magazine appearances',
    color: '#639C89',
    stroke: '#3A6B5B',
    bg: '#EAF4F0',
    text: '#2B5B4B',
  },
};

export const RELATIONSHIP_META: Record<
  RelationshipLabelKr,
  { en: string; kr: string; description: string }
> = {
  소속되었다: {
    en: 'Affiliated with',
    kr: '소속되었다',
    description: "Member's documented affiliation with an entertainment agency",
  },
  재데뷔하였다: {
    en: 'Redebuted in',
    kr: '재데뷔하였다',
    description: "Member's redebut in a post-disbandment idol group",
  },
  참여하였다: {
    en: 'Participated in',
    kr: '참여하였다',
    description: 'Participation in a Produce 48 competition unit',
  },
  출연하였다: {
    en: 'Appeared in',
    kr: '출연하였다',
    description: 'Appearance in a post-disbandment program, radio, or magazine',
  },
  활동했었다: {
    en: 'Performed / active in',
    kr: '활동했었다',
    description: 'Documented group activity prior to or parallel with IZ*ONE',
  },
  관리된다: {
    en: 'Managed by',
    kr: '관리된다',
    description: 'Idol group managed by an entertainment agency',
  },
};

export const ENGLISH_GLOSS: Record<string, string> = {
  C01: 'Kwon Eunbi',
  C02: 'Miyawaki Sakura',
  C03: 'Kang Hyewon',
  C04: 'Choi Yena',
  C05: 'Lee Chaeyeon',
  C06: 'Kim Chaewon',
  C07: 'Kim Minju',
  C08: 'Yabuki Nako',
  C09: 'Honda Hitomi',
  C10: 'Jo Yuri',
  C11: 'An Yujin',
  C12: 'Jang Wonyoung',
  '[ID-NUMBER]': 'Honda Hitomi (Unmerged Export Node #42)',
  E01: 'Woollim Entertainment',
  E02: 'A.M. Entertainment',
  E03: '8D Entertainment',
  E04: 'Yuehua Entertainment',
  E05: 'WM Entertainment',
  E06: 'Starship Entertainment',
  E07: 'Source Music (HYBE)',
  E08: 'iNKODE / iNCODE',
  E09: 'Mercury Co., Ltd.',
  E10: 'DH Co., Ltd.',
  E11: 'Peace Entertainment',
  E12: 'RBW',
  E13: 'Peace Entertainment (raw: 터테인먼트)',
  E14: 'Management SOOP',
  E15: 'TWIN PLANET',
  U01: 'Love Whisper — Team 2',
  U02: 'Very Very Very — Team 1',
  U03: 'Very Very Very — Team 2',
  U04: 'Like Ooh-Ahh — Team 1',
  U05: 'Boombayah — Team 2',
  A01: 'Rokuichi! Fukuoka (Variety)',
  A02: 'MMTG / Civilization Express (Variety)',
  A03: 'INDEED Magazine Vol. 12 (Pictorial)',
  A04: 'Quiz THE Iwakan (Variety)',
  A05: 'Jun Hyoseong Dreaming Radio (Radio)',
};

export const GENRE_GLOSS: Record<string, string> = {
  예능: 'Variety / TV',
  화보: 'Magazine Pictorial',
  라디오: 'Radio Broadcast',
};

export interface ParsedGraphData {
  nodes: RawNeo4jNode[];
  relationships: RawNeo4jRelationship[];
  nodeById: Map<string, RawNeo4jNode>;
}

export function parseNeo4jExport(mergeDuplicateHitomi = false): ParsedGraphData {
  const lines = RAW_NEO4J_EXPORT.trim().split('\n');
  const rawNodes: RawNeo4jNode[] = [];
  const rawRels: RawNeo4jRelationship[] = [];

  for (const line of lines) {
    const obj = JSON.parse(line);
    if (obj.type === 'node') {
      rawNodes.push(obj as RawNeo4jNode);
    } else if (obj.type === 'relationship') {
      rawRels.push(obj as RawNeo4jRelationship);
    }
  }

  if (!mergeDuplicateHitomi) {
    const nodeById = new Map(rawNodes.map((n) => [n.id, n]));
    return { nodes: rawNodes, relationships: rawRels, nodeById };
  }

  // Merge node #42 ("혼다 히토미", id: "[ID-NUMBER]") into node #8 ("혼다 히토미", id: "C09")
  const primaryHitomi = rawNodes.find((n) => n.id === '8');
  const nodes = rawNodes.filter((n) => n.id !== '42');
  const relationships = rawRels.map((rel) => {
    if (rel.start.id === '42' && primaryHitomi) {
      return {
        ...rel,
        start: {
          id: primaryHitomi.id,
          labels: primaryHitomi.labels,
          properties: primaryHitomi.properties,
        },
      };
    }
    return rel;
  });

  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  return { nodes, relationships, nodeById };
}

export function getDisplayGloss(node: RawNeo4jNode): string {
  return ENGLISH_GLOSS[node.properties.id] ?? node.properties.name;
}
