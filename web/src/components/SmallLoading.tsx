type Prop = {
  value: "équipes" | "joueurs" | "articles" | "matchs" | "utilisateurs";
};

export default function SmallLoading({ value }: Prop) {
  function string(value?: string) {
    if (!value) {
      return "...";
    }

    const valueArr = [
      "équipes",
      "joueurs",
      "articles",
      "matchs",
      "utilisateurs",
    ];
    valueArr.forEach((item) => {
      return `des ${item}...`;
    });
  }

  return (
    <>
      <p>Chargement{string(value)} </p>
    </>
  );
}
