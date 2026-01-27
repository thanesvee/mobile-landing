export default async function handler(req, res) {
  const fileUrl =
    "https://drive.usercontent.google.com/uc?id=1JC6to6R6GUiUhWFs-x2upnUAKgzJLTph&export=download";

  try {
    const r = await fetch(fileUrl, { redirect: "follow" });

    if (!r.ok) {
      res.status(r.status).send("Failed to fetch XLSX");
      return;
    }

    const buf = Buffer.from(await r.arrayBuffer());

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="PileTools.xlsx"');
    res.status(200).send(buf);
  } catch (err) {
    res.status(500).send("Server error fetching XLSX");
  }
}
