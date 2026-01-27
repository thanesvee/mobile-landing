export default async function handler(req, res) {
  const fileUrl =
    "https://drive.usercontent.google.com/uc?id=1dyAk3wuoo936_gS7J5OdCJMnTiOKUCg0&export=download";

  try {
    const r = await fetch(fileUrl, { redirect: "follow" });

    if (!r.ok) {
      res.status(r.status).send("Failed to fetch PDF");
      return;
    }

    const buf = Buffer.from(await r.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="Manual.pdf"');
    res.status(200).send(buf);
  } catch (err) {
    res.status(500).send("Server error fetching PDF");
  }
}
