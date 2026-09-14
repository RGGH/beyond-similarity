// Live scoring demo — Theory scene
// Item: Strap top (Jersey Basic), payload popularity 0.858, recency 0.915
// Mirrors the additive Formula Query used in app.py: score = $score + w_pop*popularity + w_rec*decay(recency)

(function () {
  const popEl = document.getElementById('w-pop');
  const recEl = document.getElementById('w-rec');
  if (!popEl || !recEl) return;

  const popVal = document.getElementById('w-pop-val');
  const recVal = document.getElementById('w-rec-val');
  const segSim = document.getElementById('seg-sim');
  const segPop = document.getElementById('seg-pop');
  const segRec = document.getElementById('seg-rec');
  const totalOut = document.getElementById('total-score-out');

  const VECTOR_SCORE = 0.73;   // representative semantic similarity for this candidate
  const POPULARITY = 0.858;    // from the sample payload
  const RECENCY_DECAY = 0.915; // recency already expressed as a decayed [0,1] value

  function render() {
    const wPop = parseFloat(popEl.value);
    const wRec = parseFloat(recEl.value);

    const popContribution = wPop * POPULARITY;
    const recContribution = wRec * RECENCY_DECAY;
    const total = VECTOR_SCORE + popContribution + recContribution;

    popVal.textContent = wPop.toFixed(2);
    recVal.textContent = wRec.toFixed(2);

    const maxScale = 1.9; // keeps the bar readable across the slider range
    segSim.style.width = (VECTOR_SCORE / maxScale * 100) + '%';
    segPop.style.width = (popContribution / maxScale * 100) + '%';
    segRec.style.width = (recContribution / maxScale * 100) + '%';

    totalOut.innerHTML = 'final_score = <b>' + total.toFixed(3) + '</b>';
  }

  popEl.addEventListener('input', render);
  recEl.addEventListener('input', render);
  render();
})();
