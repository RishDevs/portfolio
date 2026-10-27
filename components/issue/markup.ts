// Page markup for "Issue 01" (build 5). Authored HTML rendered once by <Issue />;
// components/issue/runtime.js attaches all motion and demo behaviour to the
// data-* hooks below. Styles live in app/issue.css.

const RESUME = 'href="/Rishi_Kolluru_Resume.pdf" download="Rishi-Kolluru-Resume.pdf"'
const EMAIL = "rishdevs.work@gmail.com"
const EXT = 'target="_blank" rel="noopener noreferrer"'

const bar = (label: string, value: string, width: string, mine = false) => `
  <div class="bar${mine ? " bar--mine" : ""}">
    <span class="bar__label">${label}</span>
    <span class="bar__track"><span class="bar__fill" data-w="${width}" style="width:${width}"></span><span class="bar__value">${value}</span></span>
  </div>`

const node = (i: number, title: string, sub: string, extra = "") =>
  `<div class="node" data-node="${i}"${extra}><b>${title}</b><span>${sub}</span></div>`
const link = `<span class="pipe__link" aria-hidden="true"></span>`

const burst = (big: string, small: string, cls = "") => `
  <div class="sticker burst ${cls}" data-burst>
    <span class="burst__ink" aria-hidden="true"></span>
    <span class="burst__face"><span class="burst__num">${big}</span><span class="burst__lbl">${small}</span></span>
  </div>`

const code = (repo: string, tools: string) => `
  <a class="panel panel--ink code" data-pop="2" href="https://github.com/RishDevs/${repo}" ${EXT}>
    <span class="code__tools">${tools}</span>
    <span class="code__cta">Read the code ↗</span>
  </a>`

export const issueMarkup = `
<nav class="topbar" aria-label="Quick links">
  <a href="#letters">Ask</a>
  <a href="mailto:${EMAIL}">Email</a>
  <a ${RESUME}>Résumé</a>
</nav>

<div class="tracker" data-tracker aria-hidden="true"><span data-pg>PG 01</span></div>

<section id="cover" data-ch="cover" class="cover" aria-labelledby="cover-title">
  <div class="cover__rays" data-rays aria-hidden="true"></div>
  <div class="cover__dots" aria-hidden="true"></div>
  <div class="wrap cover__inner">
    <header class="masthead" data-pop="0">
      <div class="masthead__issue"><span>No.</span><b>01</b></div>
      <div class="masthead__brand">
        <span class="masthead__name">Earth-716 Comics</span>
        <span class="masthead__sub">Mumbattan edition · LLM serving, retrieval, distillation</span>
      </div>
      <div class="masthead__date">Oct 2026</div>
      <div class="masthead__price"><span>₹10</span><span>25¢</span></div>
    </header>

    <div class="cover__body">
      <div class="cover__text">
        <p class="caption caption--solo" data-pop="1">ML / AI engineer · MS CS, University at Buffalo · Available Dec 2026</p>
        <h1 id="cover-title" class="h1 misreg" data-pop="1" data-chroma>Rishi<br>Kolluru</h1>
        <p class="cover__deck" data-pop="2">I make LLM systems fast, cheap and hard to break: serving, retrieval and distillation, each measured against a baseline.</p>
        <div class="cover__ctas" data-pop="3">
          <a class="btn btn--ink" ${RESUME}>Download résumé</a>
          <a class="btn" href="#contents">Read the issue</a>
          <a class="textlink" href="https://github.com/RishDevs" ${EXT}>GitHub ↗</a>
          <a class="textlink" href="https://www.linkedin.com/in/rishi-kolluru/" ${EXT}>LinkedIn ↗</a>
        </div>
      </div>

      <figure class="cover__art" data-pop="2">
        <canvas class="cover__sense" data-sense aria-hidden="true"></canvas>
        <div class="portrait" data-portrait>
          <img src="/rishi-comic.jpg" width="880" height="1320" fetchpriority="high" decoding="async" alt="Rishi Kolluru drawn as a comic-book hero over the Hyderabad skyline" draggable="false">
          <figcaption class="caption caption--foot">Earth-716's resident ML engineer</figcaption>
        </div>
        <p class="balloon cover__balloon">I make LLMs serve 12× faster on the same GPU.</p>
        ${burst("12.2×", "throughput", "cover__burst")}
      </figure>
    </div>

    <div class="barcode" aria-hidden="true"><span class="barcode__bars"></span><span class="barcode__num">0 71669 00716 1</span></div>
  </div>
</section>

<section id="contents" data-ch="contents" class="contents" aria-labelledby="contents-title">
  <div class="wrap">
    <div class="contents__head" data-pop="0">
      <h2 id="contents-title" class="h2">Contents</h2>
      <p class="contents__note">Three systems. Every number is measured against a baseline.</p>
    </div>
    <ol class="toc">
      <li data-pop="1"><a class="toc__row" href="#gateway">
        <span class="toc__pg">03</span>
        <span class="toc__main"><span class="toc__title">The Inference Gateway</span><span class="toc__line">LLM serving. Throughput vs one-at-a-time on one T4.</span></span>
        <span class="toc__leader" aria-hidden="true"></span>
        <span class="toc__metric"><span data-count="12.2" data-dec="1">12.2</span>×</span>
      </a></li>
      <li data-pop="2"><a class="toc__row" href="#search">
        <span class="toc__pg">07</span>
        <span class="toc__main"><span class="toc__title">The Hybrid Search</span><span class="toc__line">Retrieval and ranking. nDCG@10 over BM25 on 3 BEIR datasets.</span></span>
        <span class="toc__leader" aria-hidden="true"></span>
        <span class="toc__metric">+<span data-count="12.6" data-dec="1">12.6</span></span>
      </a></li>
      <li data-pop="3"><a class="toc__row" href="#cascade">
        <span class="toc__pg">11</span>
        <span class="toc__main"><span class="toc__title">The Small-Model Cascade</span><span class="toc__line">Distillation and cost. LLM calls vs teacher-only, same accuracy.</span></span>
        <span class="toc__leader" aria-hidden="true"></span>
        <span class="toc__metric">−<span data-count="68">68</span>%</span>
      </a></li>
    </ol>
  </div>
</section>

<div class="scene-wrap">
  <div class="scene" aria-hidden="true">
    <canvas data-scene></canvas>
    <div class="scene__label" data-scene-label></div>
  </div>

  <section id="gateway" data-ch="gateway" class="chapter" aria-labelledby="gateway-title">
    <div class="panel splash splash--mari" data-pop="0">
      <span class="caption">Chapter 01</span>
      <h2 id="gateway-title" class="chapter__title misreg">The Inference Gateway</h2>
    </div>

    <div class="strip">
      <div class="panel" data-pop="1"><span class="caption">The problem</span>
        <p>Serving Qwen2.5-1.5B one request at a time: users waited about two minutes for a first token, and long-context bursts crashed the GPU.</p></div>
      <div class="panel" data-pop="2"><span class="caption">The move</span>
        <p>A FastAPI and asyncio gateway with continuous micro-batching, FP16/SDPA inference and token streaming, plus token-budget admission control with preemption and profiler-guided length lanes.</p></div>
      <div class="panel panel--result" data-pop="3"><span class="caption">The result</span>
        <p><b><span data-count="12.2" data-dec="1">12.2</span>× throughput</b> vs one-at-a-time. Median time to first token <b>109 s to 150 ms</b>. Padded KV tokens <b>−62%</b> vs a single queue.</p></div>
    </div>

    <div class="row row--7-4">
      <div class="panel demo" data-pop="0">
        <div class="demo__bar"><h3>Continuous batching</h3></div>
        <div class="demo__body">
          <div class="seg" role="group" aria-label="Scheduling mode">
            <button type="button" data-mode="naive" data-action="setNaive" aria-pressed="false">One at a time</button>
            <button type="button" data-mode="batch" data-action="setBatch" aria-pressed="true">Batched</button>
          </div>
          <p class="demo__hint">Switch modes and watch time to first token and the queue.</p>
          <div class="lanes__head" aria-hidden="true"><span>Req</span><span>Prompt</span><span>Streamed answer</span><span>State</span></div>
          <div class="lanes" data-lanes aria-live="off"></div>
          <dl class="stats">
            <div><dt>Tokens / s</dt><dd data-stat="tps">—</dd></div>
            <div><dt>TTFT p50</dt><dd data-stat="ttft">—</dd></div>
            <div><dt>Batch</dt><dd data-stat="batch">—</dd></div>
            <div><dt>Queued</dt><dd data-stat="queue">—</dd></div>
          </dl>
        </div>
        <span class="sfx" data-sfx="gateway" aria-hidden="true">Thwip</span>
      </div>

      <div class="panel chart" data-pop="1"><span class="caption">Throughput vs one-at-a-time</span>
        <div class="bars">
          ${bar("One at a time", "1.0×", "3.2%")}
          ${bar("This gateway", "12.2×", "39%", true)}
          ${bar("vLLM (reference)", "31.3×", "100%")}
        </div>
        <p class="note">32 concurrent users on one T4, mean of 3 runs. 39% of vLLM with a from-scratch scheduler.</p>
      </div>
    </div>

    <div class="row row--5-3-2">
      <div class="panel demo" data-pop="0">
        <div class="demo__bar"><h3>4× long-context burst</h3></div>
        <div class="demo__body">
          <div class="demo__controls">
            <button type="button" class="btn btn--sm" data-action="runBurst">Run burst</button>
            <p class="demo__hint">100 requests against an unguarded server and the gateway.</p>
          </div>
          <div class="burstgrids">
            <div data-bwrap="bad"><h4>Unguarded</h4><div class="grid100" data-bgrid="bad"></div><p class="mono">77 failed · 3 crashes</p></div>
            <div data-bwrap="good"><h4>This gateway</h4><div class="grid100" data-bgrid="good"></div><p class="mono">0 failed · 7.0 GB peak</p></div>
          </div>
          <p class="legend"><span class="key key--ok"></span>served <span class="key key--fail"></span>failed</p>
          <p class="demo__result"><b>0 OOMs</b> under a 4× long-context burst, vs 3 crashes and 77% failed requests unguarded.</p>
        </div>
      </div>
      <div class="panel panel--pea stickerbay" data-pop="1">
        ${burst("150 ms", "first token, was 109 s")}
      </div>
      ${code("llm-inference-gateway", "Python, PyTorch, Hugging Face, FastAPI, asyncio, vLLM, Docker")}
    </div>

    <div class="panel pipe-panel" data-pop="0"><span class="caption">Request path</span>
      <div class="pipe-scroll"><div class="pipe" data-pipe>
        ${node(0, "Clients", "32 concurrent")}${link}
        ${node(1, "FastAPI · asyncio", "intake")}${link}
        ${node(2, "Admission control", "token budget, preempt")}${link}
        ${node(3, "Length lanes", "cost model")}${link}
        ${node(4, "Micro-batcher", "continuous")}${link}
        ${node(5, "Qwen2.5-1.5B", "FP16 · SDPA · T4")}${link}
        ${node(6, "SSE stream", "token by token")}
      </div></div>
    </div>
  </section>

  <section id="search" data-ch="search" class="chapter" aria-labelledby="search-title">
    <div class="panel splash splash--pea" data-pop="0">
      <span class="caption">Chapter 02</span>
      <h2 id="search-title" class="chapter__title misreg">The Hybrid Search</h2>
    </div>

    <div class="strip">
      <div class="panel" data-pop="1"><span class="caption">The problem</span>
        <p>Keyword search misses paraphrases, dense search misses exact terms, and a 1.6 s/query cross-encoder is too slow to run on every query.</p></div>
      <div class="panel" data-pop="2"><span class="caption">The move</span>
        <p>From-scratch BM25 plus bge-small embeddings in FAISS, weighted reciprocal rank fusion and cross-encoder reranking, with a ridge-regression router that predicts which queries are worth reranking.</p></div>
      <div class="panel panel--result" data-pop="3"><span class="caption">The result</span>
        <p><b>+<span data-count="12.6" data-dec="1">12.6</span> nDCG@10</b> over BM25 (p &lt; 10⁻⁵). Mean query latency <b>−57%</b> vs reranking every query. CI gate <b>88 min to 39 s</b>.</p></div>
    </div>

    <div class="row row--7-4">
      <div class="panel demo" data-pop="0">
        <div class="demo__bar"><h3>Rerank router</h3></div>
        <div class="demo__body">
          <div class="seg" role="group" aria-label="Which queries get reranked">
            <button type="button" data-rt="random" data-action="routerRandom" aria-pressed="false">Random 49%</button>
            <button type="button" data-rt="learned" data-action="routerLearned" aria-pressed="true">Learned 49%</button>
          </div>
          <p class="demo__hint">Same budget: 49% of queries reranked. Compare how much of the gain survives.</p>
          <div class="router">
            <div class="grid100 grid100--router" data-rgrid></div>
            <div class="router__readout">
              <p class="mono">Share of full-rerank gain kept</p>
              <p class="router__val"><span data-rval>69</span>%</p>
              <p data-rcap>The router predicts each query's rerank gain from 8 retrieval signals: same cost, 20 more points of gain.</p>
            </div>
          </div>
        </div>
        <span class="sfx" data-sfx="search" aria-hidden="true">Snap</span>
      </div>

      <div class="panel chart" data-pop="1"><span class="caption">nDCG@10 gain over BM25</span>
        <div class="bars">
          ${bar("BM25", "+0.0", "1%")}
          ${bar("Dense", "+7.1", "56%")}
          ${bar("Hybrid (this engine)", "+12.6", "100%", true)}
        </div>
        <p class="note">3 BEIR datasets. Fusion weights and reranker tuned on dev splits only.</p>
      </div>
    </div>

    <div class="row row--3-5-2">
      <div class="panel panel--mari stickerbay" data-pop="0">
        ${burst("−57%", "query latency")}
      </div>
      <div class="panel table" data-pop="1"><span class="caption">12 FAISS configs, 200K documents</span>
        <table>
          <thead><tr><th scope="col">Index</th><th scope="col">Speed / size vs exact</th><th scope="col">Quality</th></tr></thead>
          <tbody>
            <tr><td>Exact (flat)</td><td>1×</td><td>1.00 R@10</td></tr>
            <tr class="is-mine"><td>HNSW</td><td>51× faster</td><td>0.97 R@10</td></tr>
            <tr><td>Binary + rescore</td><td>32× smaller</td><td>−0.01 nDCG</td></tr>
          </tbody>
        </table>
      </div>
      ${code("hybrid-search-engine", "Python, FAISS, Sentence-Transformers, cross-encoders, scikit-learn, FastAPI, GitHub Actions")}
    </div>

    <div class="panel pipe-panel" data-pop="0"><span class="caption">Query path · the router decides</span>
      <div class="pipe-scroll"><div class="pipe" data-pipe>
        ${node(0, "Query", "text")}${link}
        <div class="pipe__stack">${node(1, "BM25", "from scratch", ' data-p="0.5"')}${node(1, "Dense · FAISS", "bge-small · HNSW")}</div>${link}
        ${node(2, "Weighted RRF", "fusion")}${link}
        ${node(3, "Rerank router", "ridge · 8 signals")}${link}
        <div class="pipe__stack">${node(4, "Cross-encoder", "49% of queries", ' data-p="0.49"')}${node(4, "Skip rerank", "51% of queries", ' data-skip="1"')}</div>${link}
        ${node(5, "Top-10", "CI-gated")}
      </div></div>
    </div>
  </section>

  <section id="cascade" data-ch="cascade" class="chapter" aria-labelledby="cascade-title">
    <div class="panel splash splash--mag" data-pop="0">
      <span class="caption">Chapter 03</span>
      <h2 id="cascade-title" class="chapter__title misreg">The Small-Model Cascade</h2>
    </div>

    <div class="strip">
      <div class="panel" data-pop="1"><span class="caption">The problem</span>
        <p>Sending every CLINC150 intent query to a large LLM is accurate but slow and expensive, and there were no human labels to train anything cheaper.</p></div>
      <div class="panel" data-pop="2"><span class="caption">The move</span>
        <p>Distilled a 27.8B Qwen teacher's zero-shot labels (local Ollama, JSON-schema decoding) into DistilBERT, exported to ONNX INT8. A confidence gate defers only uncertain queries to the teacher.</p></div>
      <div class="panel panel--result" data-pop="3"><span class="caption">The result</span>
        <p><b>−<span data-count="68">68</span>% LLM calls</b> vs teacher-only, at <b>89.3%</b> accuracy vs the teacher's 89.1%. Student <b>257 to 65 MB</b>, <b>1.9 ms</b> p50 on CPU, no API cost.</p></div>
    </div>

    <div class="row row--7-4">
      <div class="panel demo" data-pop="0">
        <div class="demo__bar"><h3>Confidence-routed cascade</h3></div>
        <div class="demo__body">
          <div class="demo__controls">
            <button type="button" class="btn btn--sm" data-action="fire">Route 100 queries</button>
            <p class="demo__hint">Confident queries stay on the student; uncertain ones go to the teacher.</p>
          </div>
          <div class="fire">
            <canvas data-fire aria-hidden="true"></canvas>
            <span class="fire__tag fire__tag--in">Queries</span>
            <span class="fire__tag fire__tag--gate">Confidence gate</span>
            <span class="fire__tag fire__tag--stu">Student <b data-fs>0</b></span>
            <span class="fire__tag fire__tag--tea">27.8B teacher <b data-ft>0</b></span>
          </div>
          <p class="note">65 MB INT8 student at 1.9 ms. 68 / 32 split at a 1% teacher-disagreement budget.</p>
        </div>
        <span class="sfx sfx--right" data-sfx="cascade" aria-hidden="true">Whoosh</span>
      </div>

      <div class="panel chart" data-pop="1"><span class="caption">LLM calls avoided, by teacher size</span>
        <div class="bars">
          ${bar("7B teacher", "45%", "45%")}
          ${bar("27.8B teacher (used)", "68%", "68%", true)}
        </div>
        <p class="note">A stronger teacher yields a more confident student. 0 invalid labels.</p>
      </div>
    </div>

    <div class="row row--5-3-2">
      <div class="panel chart" data-pop="0"><span class="caption">Student, FP32 vs INT8</span>
        <div class="bars">
          <p class="bars__group mono">Size, MB</p>
          ${bar("FP32", "257", "100%")}
          ${bar("INT8", "65", "25.3%", true)}
          <p class="bars__group mono">CPU speed vs FP32</p>
          ${bar("FP32", "1.0×", "52.6%")}
          ${bar("INT8", "1.9×", "100%", true)}
        </div>
        <p class="note">1.9 ms p50, 3.1 ms p95. 98.3% agreement with FP32.</p>
      </div>
      <div class="panel panel--mag stickerbay" data-pop="1">
        ${burst("89.3%", "vs teacher 89.1%")}
      </div>
      ${code("llm-small-model-cascade", "Python, PyTorch, Hugging Face, ONNX Runtime, Ollama, FastAPI")}
    </div>
  </section>
</div>

<section id="stack" data-ch="stack" class="arsenal" aria-labelledby="stack-title">
  <div class="wrap">
    <h2 id="stack-title" class="h2" data-pop="0">The Arsenal</h2>
    <p class="arsenal__note" data-pop="0">Superscripts mark the chapter a tool appears in.</p>
    <dl class="index" data-pop="1">
      <div><dt>ML / LLM</dt><dd>PyTorch<sup>1,3</sup>, Hugging Face<sup>1,3</sup>, vLLM<sup>1</sup>, ONNX Runtime<sup>3</sup>, scikit-learn<sup>2</sup>, TensorFlow, MLflow, Ollama<sup>3</sup></dd></div>
      <div><dt>Retrieval</dt><dd>FAISS<sup>2</sup>, BM25<sup>2</sup>, Sentence-Transformers<sup>2</sup>, cross-encoders<sup>2</sup>, HNSW<sup>2</sup>, IVF-PQ, reciprocal rank fusion<sup>2</sup></dd></div>
      <div><dt>Systems</dt><dd>FastAPI<sup>1,2,3</sup>, asyncio<sup>1</sup>, Docker<sup>1</sup>, GitHub Actions<sup>2</sup>, PostgreSQL, Redis, Git, Linux, REST APIs</dd></div>
      <div><dt>Languages</dt><dd>Python<sup>1,2,3</sup>, Java, SQL, C, JavaScript</dd></div>
    </dl>
  </div>
</section>

<section id="about" data-ch="about" class="origin" aria-labelledby="about-title">
  <div class="wrap">
    <h2 id="about-title" class="h2" data-pop="0">Origin story</h2>
    <div class="timeline" data-pop="0" aria-hidden="true"><span>2021</span><span>2023</span><span>2025</span><span>Now</span></div>
    <div class="origin__grid">
      <article class="panel" data-pop="1"><span class="caption">Hyderabad · 2021–25</span>
        <p>B.Tech. in Computer Science at IARE. As analytics lead for the CETA computer science club, built a Random Forest proficiency classifier on 1,200+ assessment records (94% held-out accuracy) and three Power BI dashboards.</p></article>
      <article class="panel" data-pop="2"><span class="caption">Pullulate · 2023–25</span>
        <p>Two years as a software engineering intern in data and ML: a product classifier at 94% held-out accuracy, a recommender at 89% Precision@5, and an OpenAI shopping assistant at 92% response accuracy on a manually evaluated set.</p></article>
      <article class="panel panel--now" data-pop="3"><span class="caption">Buffalo, NY · 2025–now</span>
        <p class="origin__now">M.S. in Computer Science and Engineering at the University at Buffalo, graduating December 2026.</p>
        <p>The work moved down the stack: how models are served, how they are searched against, and how to make them cheap enough to run. Open to full-time ML / AI engineering roles from December 2026.</p></article>
    </div>
  </div>
</section>

<section id="letters" data-ch="letters" class="letters" aria-labelledby="letters-title">
  <div class="wrap">
    <h2 id="letters-title" class="h2" data-pop="0">Letters</h2>
    <p class="letters__intro" data-pop="0">Ask about Rishi's work. Replies draw only on his résumé and this issue.</p>
    <div class="letters__grid">
      <div class="panel letters__desk" data-pop="1">
        <form class="letter" data-ask-form>
          <label class="caption" for="ask-q">Dear editor,</label>
          <span class="stamp" aria-hidden="true"><span class="stamp__face"><img src="/rishi-comic.jpg" alt="" width="880" height="1320" loading="lazy"><span>716</span></span></span>
          <textarea id="ask-q" name="q" rows="3" maxlength="300" required placeholder="What did Rishi build for LLM serving?"></textarea>
          <div class="letter__foot">
            <span class="letter__count mono" data-ask-count>0 / 300</span>
            <button type="submit" class="btn btn--ink" data-ask-send>Post</button>
          </div>
        </form>
        <div class="reply">
          <div class="reply__avatar" data-ask-avatar>
            <img src="/rishi-comic.jpg" alt="" width="880" height="1320" loading="lazy">
            <svg class="reply__sense" viewBox="0 0 80 80" aria-hidden="true"><path d="M10 22 q6 -6 4 -14"/><path d="M22 10 q2 -8 -4 -12"/><path d="M58 10 q-2 -8 4 -12"/><path d="M70 22 q-6 -6 -4 -14"/></svg>
          </div>
          <div class="balloon reply__balloon" role="status" aria-live="polite">
            <p data-ask-answer>Pick a letter from the mailbag, or write your own.</p>
            <p class="reply__src" data-ask-src></p>
          </div>
        </div>
      </div>
      <div class="mailbag" data-pop="2">
        <h3>From the mailbag</h3>
        <button type="button" class="card" data-ask="What's the biggest speedup Rishi has shipped?">What's the biggest speedup Rishi has shipped?</button>
        <button type="button" class="card" data-ask="How does the hybrid search decide what to rerank?">How does the hybrid search decide what to rerank?</button>
        <button type="button" class="card" data-ask="Where did Rishi work before grad school?">Where did Rishi work before grad school?</button>
        <button type="button" class="card" data-ask="When is Rishi available, and for what roles?">When is Rishi available, and for what roles?</button>
      </div>
    </div>
    <p class="editors-note" data-pop="3">Editor's note: retrieval is BM25 over passages from Rishi's résumé and this issue. When the language model is unavailable, the closest passage is quoted as written.</p>
  </div>
</section>

<section id="contact" data-ch="contact" class="backcover" aria-labelledby="contact-title">
  <div class="wrap">
    <p class="caption caption--solo caption--big" data-pop="0">Next issue</p>
    <h2 id="contact-title" class="h2 backcover__title" data-pop="1">To be continued… on your team?</h2>
    <p class="backcover__lead" data-pop="2">Hiring for ML infrastructure, LLM serving or applied retrieval. Buffalo, NY · ET</p>
    <a class="backcover__email" data-pop="3" href="mailto:${EMAIL}">${EMAIL}</a>
    <p class="linkrow" data-pop="4">
      <a href="https://www.linkedin.com/in/rishi-kolluru/" ${EXT}>LinkedIn ↗</a><span aria-hidden="true">·</span>
      <a href="https://github.com/RishDevs" ${EXT}>GitHub ↗</a><span aria-hidden="true">·</span>
      <a ${RESUME}>Résumé</a>
    </p>
    <footer class="colophon">
      <span>Rishi Kolluru · Earth-716 · Buffalo, NY</span>
      <a href="#cover">Back to cover</a>
    </footer>
  </div>
</section>
`
