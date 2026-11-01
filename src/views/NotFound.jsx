import { PageIntro, TextLink } from "../components/Editorial";
export default function NotFound() {
  return (
    <div className="not-found">
      <PageIntro
        number="404"
        label="A small detour"
        pageTitle="Page not found"
        title="Nothing here."
        italic="Let’s head back."
        description="That page may have moved, or the address might be a little off."
      >
        <TextLink to="/">Back to the homepage</TextLink>
      </PageIntro>
    </div>
  );
}
