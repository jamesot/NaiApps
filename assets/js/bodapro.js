// BodaPro page: the live ring demo and the Bike Yangu payoff simulator.
(function () {
  const ksh = (n) => "KSh " + Math.round(n).toLocaleString("en-KE");
  document.getElementById("yr").textContent = new Date().getFullYear();

  // ---------- Ring ----------
  const TARGET = 3000, START = 2250, STEP = 200;
  const R = 50, C = 2 * Math.PI * R;
  const bar = document.getElementById("ringBar");
  const ring = document.getElementById("ring");
  const amt = document.getElementById("ringAmt");
  const togo = document.getElementById("ringTogo");
  const toast = document.getElementById("toast");
  let earned = START, toastTimer;

  bar.style.strokeDasharray = C;

  function drawRing() {
    const p = Math.min(earned / TARGET, 1);
    bar.style.strokeDashoffset = C * (1 - p);
    const left = TARGET - earned;
    const hit = left <= 0;
    ring.classList.toggle("hit", hit);
    amt.textContent = hit ? "Target hit" : ksh(left);
    togo.textContent = hit ? (left < 0 ? ksh(-left) + " extra" : "Well done") : "to go";
    if (hit && navigator.vibrate) navigator.vibrate(60);
  }

  document.getElementById("addMpesa").addEventListener("click", () => {
    earned += STEP;
    drawRing();
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  });
  document.getElementById("resetRing").addEventListener("click", () => {
    earned = START;
    drawRing();
  });
  // Start empty, then fill to today's amount so the motion reads.
  bar.style.strokeDashoffset = C;
  requestAnimationFrame(() => requestAnimationFrame(drawRing));

  // ---------- Simulator (mirrors simulateExtraDaily in apps/web/src/lib/loan.ts) ----------
  const $ = (id) => document.getElementById(id);
  const loan = $("loan"), daily = $("daily"), extra = $("extra");

  function simulate() {
    const L = +loan.value, d = +daily.value, x = +extra.value;
    const baseDays = Math.ceil(L / d);
    const fastDays = Math.ceil(L / (d + x));
    const saved = Math.max(0, baseDays - fastDays);

    $("loanOut").textContent = ksh(L);
    $("dailyOut").textContent = ksh(d);
    $("extraOut").textContent = x ? "+" + ksh(x) : ksh(0);
    $("baseLbl").textContent = "Paying " + ksh(d) + " a day";
    $("fastLbl").textContent = "Paying " + ksh(d + x) + " a day";
    $("baseDays").textContent = baseDays + " days";
    $("fastDays").textContent = fastDays + " days";
    $("fastFill").style.width = Math.max(14, (fastDays / baseDays) * 100) + "%";
    $("saved").textContent = saved
      ? saved + (saved === 1 ? " day" : " days") + " sooner"
      : "Add a little extra";

    const own = new Date();
    own.setDate(own.getDate() + fastDays);
    const date = own.toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
    $("ownDate").textContent = "Starting today, the bike is yours around " + date + ". An example only: your dates depend on your own loan.";
  }
  [loan, daily, extra].forEach((el) => el.addEventListener("input", simulate));
  simulate();
})();
