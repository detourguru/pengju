export const results = {
  cat: {
    title: "고양이형",
    description: "혼자만의 시간으로 에너지를 채우는 타입",
  },
  dog: {
    title: "강아지형",
    description: "사람을 만나면 에너지가 차오르는 타입",
  },
};

export function getResult(id: string) {
  return Object.hasOwn(results, id)
    ? results[id as keyof typeof results]
    : undefined;
}
