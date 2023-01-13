export const MemberIdChoiceArr = ['홀수', '짝수'] as const;
export type MemberIdChoice = typeof MemberIdChoiceArr[number];
export const MemberIdFilterArr = ['전체', '홀수', '짝수'] as const;
export type MemberIdFilter = typeof MemberIdFilterArr[number];

export const DeviceOSChoiceArr = ['Android', 'IOS'] as const;
export type DeviceOSChoice = typeof DeviceOSChoiceArr[number];
export const DeviceOSFilterArr = ['전체', 'Android', 'IOS'] as const;
export type DeviceOSFilter = typeof DeviceOSFilterArr[number];