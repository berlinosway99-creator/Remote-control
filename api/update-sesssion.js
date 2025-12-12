export default function handler(req, res) {
  const { code, remote_code, status } = req.body;

  if (!global.sessions) global.sessions = [];

  const s = global.sessions.find(x => x.code === code);
  if (!s) return res.status(404).json({ error: "Sessione non trovata" });

  if (remote_code) s.remote_code = remote_code;
  if (status) s.status = status;

  res.status(200).json(s);
}
