/* Buchule Group — Tweaks panel (overlay only; the site itself is vanilla HTML/CSS) */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headingFont": "Newsreader",
  "corner": "soft",
  "scale": 100
}/*EDITMODE-END*/;

const FONT_STACKS = {
  "Newsreader": "'Newsreader', Georgia, serif",
  "Spectral":   "'Spectral', Georgia, serif",
  "Lora":       "'Lora', Georgia, serif"
};

const CORNERS = {
  soft:  { r: "14px", rlg: "22px" },
  sharp: { r: "3px",  rlg: "4px" }
};

function TweakApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--serif', FONT_STACKS[t.headingFont] || FONT_STACKS.Newsreader);
    const c = CORNERS[t.corner] || CORNERS.soft;
    root.style.setProperty('--r', c.r);
    root.style.setProperty('--r-lg', c.rlg);
    document.body.style.fontSize = (17 * (t.scale / 100)) + 'px';
  }, [t.headingFont, t.corner, t.scale]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Typography" />
      <TweakSelect label="Heading typeface" value={t.headingFont}
        options={["Newsreader", "Spectral", "Lora"]}
        onChange={(v) => setTweak('headingFont', v)} />
      <TweakSlider label="Text scale" value={t.scale} min={90} max={115} step={1} unit="%"
        onChange={(v) => setTweak('scale', v)} />
      <TweakSection label="Style" />
      <TweakRadio label="Corners" value={t.corner}
        options={["soft", "sharp"]}
        onChange={(v) => setTweak('corner', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweakApp />);
