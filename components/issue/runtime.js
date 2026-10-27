// Page logic for "Issue 01" (build 5). Started from the Claude Design export's
// DCLogic component; the chapter wire scene, demos and request traces keep the
// design's code. Motion follows the build-5 brief: one wipe-in entrance,
// count-ups only on the contents page and chapter results, one SFX per
// chapter, spider-sense only on portrait hover / while the Letters desk is
// thinking. Every timer, observer and animation is tracked for clean unmount.

export class IssueRuntime {
  constructor(root) {
    this.root = root
    this.mode = 'batch'
    this.off = []
    this.timers = new Set()
    this.sfxDone = new Set()
  }

  $(sel) { return this.root.querySelector(sel) }
  $$(sel) { return [...this.root.querySelectorAll(sel)] }

  mount() {
    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    this.C = { ink: '#16110e', paper: '#fffaf0', mari: '#ffa41b', mag: '#ec2a7a', pea: '#0f9a94' }
    const actions = {
      setNaive: () => this.setMode('naive'),
      setBatch: () => { this.setMode('batch'); this.sfx('gateway') },
      runBurst: () => this.runBurst(),
      routerRandom: () => this.setRouter('random'),
      routerLearned: () => { this.setRouter('learned'); this.sfx('search') },
      fire: () => { this.fire(); this.sfx('cascade') },
    }
    this.$$('[data-action]').forEach(el => {
      const fn = actions[el.dataset.action]
      if (fn) this.listen(el, 'click', fn)
    })
    ;['initReveal', 'initCover', 'initTracker', 'initScene', 'initSense', 'initSim', 'initBurstGrids', 'initRouter', 'initFire', 'initPipes', 'initLetters']
      .forEach(k => { try { this[k]() } catch (e) { console.warn(k, e) } })
  }

  unmount() {
    this.off.forEach(f => { try { f() } catch { /* already gone */ } })
    this.off = []
    this.timers.forEach(clearTimeout)
    this.timers.clear()
  }

  later(fn, ms) {
    const id = setTimeout(() => { this.timers.delete(id); fn() }, ms)
    this.timers.add(id)
    return id
  }
  cancel(id) { clearTimeout(id); this.timers.delete(id) }
  anim(el, kf, opts) { const a = el.animate(kf, opts); this.off.push(() => a.cancel()); return a }
  io(cb, o) { const x = new IntersectionObserver(cb, o); this.off.push(() => x.disconnect()); return x }
  listen(t, e, f, o) { t.addEventListener(e, f, o); this.off.push(() => t.removeEventListener(e, f, o)) }
  once(el, fn, th = 0.3) { const o = this.io(es => es.forEach(e => { if (e.isIntersecting) { o.unobserve(e.target); fn() } }), { threshold: th }); o.observe(el) }

  // One entrance style: panels wipe in left-to-right over 320ms.
  initReveal() {
    const els = this.$$('[data-pop]'), bars = this.$$('[data-w]')
    const ease = 'cubic-bezier(.2,.8,.2,1)'
    if (!this.reduce) {
      els.forEach(el => {
        const d = (+el.dataset.pop || 0) * 60
        el.style.clipPath = 'inset(0 100% 0 0)'
        el.style.transition = `clip-path 320ms ${ease} ${d}ms`
      })
      bars.forEach(b => { b.style.width = '0' })
    }
    const show = el => {
      el.style.clipPath = 'inset(0 0 0 0)'
      // Release the clip once the wipe is done so stickers/balloons can overhang.
      this.later(() => { el.style.clipPath = ''; el.style.transition = '' }, 360 + (+el.dataset.pop || 0) * 60)
      el.querySelectorAll('[data-w]').forEach(b => { b.style.width = b.dataset.w })
      el.querySelectorAll('[data-count]').forEach(c => this.countUp(c))
    }
    if (this.reduce) { els.forEach(show); return }
    // IntersectionObserver treats a fully clipped element as zero-size and never
    // reports it, so check layout boxes (unaffected by clip-path) on scroll.
    let pending = els.slice(), raf = 0
    const check = () => {
      raf = 0
      const vh = innerHeight
      pending = pending.filter(el => {
        const r = el.getBoundingClientRect()
        // Hidden at this breakpoint (display:none): nothing to animate.
        if ((!r.width && !r.height) || (r.top < vh * 0.95 && r.bottom > 0)) { show(el); return false }
        return true
      })
      if (!pending.length) { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    this.listen(window, 'scroll', onScroll, { passive: true })
    this.listen(window, 'resize', onScroll)
    raf = requestAnimationFrame(check)
    this.off.push(() => cancelAnimationFrame(raf))
  }
  countUp(el) {
    if (el._done) return; el._done = true
    if (this.reduce) return
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), t0 = performance.now(), dur = 1200
    let raf = 0
    const step = n => { const p = Math.min(1, (n - t0) / dur); el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    this.off.push(() => { cancelAnimationFrame(raf); el.textContent = to.toFixed(dec) })
  }

  // One hand-set sound effect per chapter, animated once, out of reading paths.
  sfx(key) {
    if (this.reduce || this.sfxDone.has(key)) return
    const el = this.$(`[data-sfx="${key}"]`); if (!el) return
    this.sfxDone.add(key)
    this.anim(el, [
      { opacity: 0, transform: 'scale(.4)' },
      { opacity: 1, transform: 'scale(1.08)', offset: 0.18 },
      { opacity: 1, transform: 'scale(1)', offset: 0.3 },
      { opacity: 1, transform: 'scale(1)', offset: 0.75 },
      { opacity: 0, transform: 'scale(1)' },
    ], { duration: 1400, easing: 'cubic-bezier(.2,.8,.2,1)' })
  }

  initCover() {
    const h = this.$('[data-chroma]'), cover = this.$('#cover')
    if (this.reduce) return
    this.$$('[data-rays]').forEach((r, i) => this.anim(r, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 160000 + i * 40000, iterations: Infinity }))
    // Misregistration follows the pointer slightly (single colour, H1 only).
    if (h && cover) {
      const sh = (x, y) => `${x}px ${y}px 0 #ec2a7a`
      let tx = 3, ty = 3, cx = 3, cy = 3, raf = 0
      this.listen(cover, 'pointermove', e => { const r = cover.getBoundingClientRect(); tx = 3 + ((e.clientX - r.left) / r.width - .5) * 8; ty = 3 + ((e.clientY - r.top) / r.height - .5) * 6 })
      this.listen(cover, 'pointerleave', () => { tx = 3; ty = 3 })
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; h.style.textShadow = sh(cx.toFixed(1), cy.toFixed(1)); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
      this.off.push(() => { cancelAnimationFrame(raf); h.style.textShadow = '' })
    }
  }

  initTracker() {
    const tr = this.$('[data-tracker]')
    const vis = () => { if (!tr) return; const on = scrollY > innerHeight * 0.7; tr.style.opacity = on ? '1' : '0'; tr.style.transform = on ? 'none' : 'translateY(8px)' }
    vis(); this.listen(window, 'scroll', vis, { passive: true })
    const pages = { cover: 1, contents: 2, gateway: 3, search: 7, cascade: 11, stack: 15, about: 16, letters: 17, contact: 18 }
    const pg = this.$('[data-pg]')
    const o = this.io(es => es.forEach(e => {
      if (!e.isIntersecting) return
      const id = e.target.dataset.ch, n = pages[id]; if (!n) return
      if (pg) pg.textContent = 'PG ' + String(n).padStart(2, '0')
      if (['gateway', 'search', 'cascade'].includes(id)) this.form = id
      else if (id === 'contents' || id === 'stack') this.form = 'idle'
    }), { rootMargin: '-45% 0px -50% 0px' })
    this.$$('[data-ch]').forEach(s => o.observe(s))
  }

  initScene() {
    const cv = this.$('[data-scene]'); if (!cv) return
    const label = this.$('[data-scene-label]')
    const ctx = cv.getContext('2d')
    let w = 0, h = 0, raf = 0, vis = false
    this.form = this.form || 'idle'
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0) }
    size(); this.listen(window, 'resize', size)
    const C = this.C, cols = [C.mari, C.mag, C.pea]
    const sm = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t) }
    const mix = (p, q, t) => p + (q - p) * t
    const labels = { idle: '', gateway: 'Scene · 6 request strings weave into one batch', search: 'Scene · BM25 + dense threads fuse into top-10', cascade: 'Scene · query strings split 68 student / 32 teacher' }
    let lastForm = '', alpha = 0, cur = 'idle'
    // a strand = function(s in 0..1, t) -> [x,y]; drawn as inked comic line, beads ride along it
    const strands = (f, t) => {
      const S = []
      if (f === 'gateway') {
        for (let l = 0; l < 6; l++) S.push({ col: cols[l % 3], wd: 3, fn: s => { const conv = sm(0.5, 0.82, s), ly = h * (0.18 + l * 0.128); return [mix(-0.02, 1.02, s) * w, mix(ly, h * 0.5 + (l - 2.5) * 7, conv) + Math.sin(s * 14 + t * 2.2 + l) * 14 * (1 - conv)] } })
      } else if (f === 'search') {
        for (let k = 0; k < 14; k++) {
          const cls = k % 2, oy = (k / 14 - 0.5) * 90, ph = k * 0.7
          S.push({ col: cls ? C.pea : C.mari, wd: 2.4, fn: s => {
            const sx = w * 0.04, sy = h * (cls ? 0.72 : 0.28) + oy * 0.6, fx = w * 0.55, fy = h * 0.5 + oy * 0.25, ex = w * 1.02, ey = h * 0.5 + oy * 1.4
            if (s < 0.6) { const q = s / 0.6, e = q * q * (3 - 2 * q); return [mix(sx, fx, q), mix(sy, fy, e) + Math.sin(q * 9 + t * 1.8 + ph) * 12 * (1 - e)] }
            const q = (s - 0.6) / 0.4; return [mix(fx, ex, q), mix(fy, ey, q * q) + Math.sin(q * 6 + t * 2 + ph) * 4]
          } })
        }
      } else if (f === 'cascade') {
        for (let k = 0; k < 10; k++) {
          const stu = k < 7, oy = (k / 10 - 0.5) * 50, ph = k * 0.9
          S.push({ col: stu ? C.pea : C.mag, wd: stu ? 2.4 : 3.6, fn: s => {
            const gx = w * 0.46, gy = h * 0.5 + oy * 0.4
            if (s < 0.45) { const q = s / 0.45; return [mix(-0.02 * w, gx, q), mix(h * 0.5 + oy, gy, q) + Math.sin(q * 10 + t * 2.4 + ph) * 10 * (1 - q)] }
            const q = (s - 0.45) / 0.55, e = q * q * (3 - 2 * q), ty = h * (stu ? 0.27 : 0.76) + oy * (stu ? 1.6 : 1.2)
            return [mix(gx, w * 1.02, q), mix(gy, ty, e) + Math.sin(q * 7 + t * 2 + ph) * 6 * q]
          } })
        }
      } else {
        for (let k = 0; k < 5; k++) S.push({ col: '#16110e', wd: 1.4, fn: s => [mix(-0.02, 1.02, s) * w, h * (0.15 + k * 0.18) + Math.sin(s * 6 + t * 0.6 + k * 1.3) * 30 + Math.sin(s * 15 - t * 0.9 + k) * 8] })
      }
      return S
    }
    const path = (fn, n) => { ctx.beginPath(); for (let i = 0; i <= n; i++) { const [x, y] = fn(i / n); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y) } }
    let pend = 'idle', pendAt = 0, prev = null, prevA = 0
    const render = (form, a, t) => {
      if (a <= 0) return
      const S = strands(form, t), op = (form === 'idle' ? 0.22 : 0.9) * a
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      S.forEach(st => { ctx.globalAlpha = op; path(st.fn, 90); ctx.strokeStyle = '#16110e'; ctx.lineWidth = st.wd + 2.6; ctx.stroke(); ctx.strokeStyle = st.col; ctx.lineWidth = st.wd; ctx.stroke() })
      if (form === 'idle') return
      S.forEach((st, k) => {
        for (let b = 0; b < 3; b++) {
          const s = ((t * (0.09 + (k % 3) * 0.02)) + b / 3 + k * 0.137) % 1, [x, y] = st.fn(s), r = st.wd + 2.2
          ctx.globalAlpha = a * Math.min(1, Math.sin(s * Math.PI) * 3)
          ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = '#16110e'; ctx.lineWidth = 2
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); ctx.stroke()
          ctx.fillStyle = st.col; ctx.beginPath(); ctx.arc(x, y, r * 0.45, 0, 6.283); ctx.fill()
        }
      })
    }
    const draw = now => {
      raf = requestAnimationFrame(draw)
      if (!vis) return
      const t = this.reduce ? 0 : now / 1000, want = this.form || 'idle'
      if (want !== pend) { pend = want; pendAt = now }
      if (pend !== cur && now - pendAt > 220) { prev = cur; prevA = alpha; cur = pend; alpha = 0 }
      if (prev) { prevA -= 0.05; if (prevA <= 0) prev = null }
      alpha = Math.min(1, alpha + 0.035)
      if (cur !== lastForm && label) { label.textContent = labels[cur] || ''; lastForm = cur }
      ctx.clearRect(0, 0, w, h)
      if (prev) render(prev, prevA, t)
      render(cur, alpha, t)
      ctx.globalAlpha = 1
    }
    this.io(([e]) => { vis = e.isIntersecting }).observe(cv)
    raf = requestAnimationFrame(draw); this.off.push(() => cancelAnimationFrame(raf))
  }

  // Spider-sense curls: only while the pointer is on the portrait.
  initSense() {
    const cv = this.$('[data-sense]'), portrait = this.$('[data-portrait]'); if (!cv || !portrait) return
    const ctx = cv.getContext('2d')
    let w = 0, h = 0, raf = 0, vis = false, near = 0, tn = 0
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0) }
    size(); this.listen(window, 'resize', size)
    this.listen(portrait, 'pointermove', e => { const r = cv.getBoundingClientRect(); tn = Math.max(0.35, 1 - Math.hypot(e.clientX - (r.left + w * 0.4625), e.clientY - (r.top + h * 0.5625)) / 380) })
    this.listen(portrait, 'pointerleave', () => { tn = 0 })
    const N = 9
    const draw = now => {
      raf = requestAnimationFrame(draw)
      if (!vis || !w) return
      near += (tn - near) * 0.08
      ctx.clearRect(0, 0, w, h)
      if (near < 0.01) return
      const t = this.reduce ? 0.5 : now / 1000
      const W = w / 1.6, hx = w * 0.4625, hy = h * 0.5625
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      for (let i = 0; i < N; i++) {
        const ang = -Math.PI + (i + 0.5) / N * Math.PI
        const cyc = this.reduce ? 0.5 : ((t * (0.5 + near * 0.6)) + i * 0.41) % 1
        const fade = Math.sin(cyc * Math.PI) * near
        const r0 = W * (0.2 + cyc * 0.06), len = W * (0.1 + near * 0.05)
        const ca = Math.cos(ang), sa = Math.sin(ang), nx = -sa, ny = ca, amp = W * (0.016 + near * 0.01)
        const stroke = (col, ox, oy, wd, al) => {
          ctx.globalAlpha = al * fade; ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath()
          for (let k = 0; k <= 24; k++) { const s = k / 24, d = r0 + s * len, wv = Math.sin(s * Math.PI * 5 + t * 7 + i) * amp * Math.sin(s * Math.PI); const x = hx + ca * d + nx * wv + ox, y = hy + sa * d + ny * wv + oy; if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y) }
          ctx.stroke()
        }
        stroke('#ec2a7a', 2.5, 2, 3.5, 0.6)
        stroke('#0f9a94', -2, -1.5, 2.6, 0.45)
        stroke('#16110e', 0, 0, 3, 0.95)
      }
      ctx.globalAlpha = 1
    }
    this.io(([e]) => { vis = e.isIntersecting }).observe(cv)
    raf = requestAnimationFrame(draw); this.off.push(() => cancelAnimationFrame(raf))
  }

  initBurstGrids() {
    ['bad', 'good'].forEach(k => {
      const g = this.$(`[data-bgrid="${k}"]`); if (!g) return
      g.innerHTML = ''
      g._cells = Array.from({ length: 100 }, () => { const c = document.createElement('span'); g.appendChild(c); return c })
    })
    const g = this.$('[data-bgrid="bad"]')
    if (g) this.once(g, () => this.runBurst(), 0.4)
  }
  runBurst() {
    const bad = this.$('[data-bgrid="bad"]'), good = this.$('[data-bgrid="good"]'); if (!bad || !good || !bad._cells || !good._cells) return
    ;(this._btl || []).forEach(id => this.cancel(id)); this._btl = []
    const order = [...Array(100).keys()].sort(() => Math.random() - .5), fail = new Set(order.slice(0, 77))
    ;[bad, good].forEach(g => g._cells.forEach(c => { c.style.background = ''; c.style.transform = '' }))
    for (let i = 0; i < 100; i++) {
      this._btl.push(this.later(() => {
        const c = bad._cells[i], f = fail.has(i)
        c.style.background = f ? '#ec2a7a' : '#0f9a94'; c.style.transform = f ? 'scale(.82)' : 'none'
        good._cells[i].style.background = '#0f9a94'
      }, this.reduce ? 0 : i * 22))
    }
  }

  initRouter() {
    const g = this.$('[data-rgrid]'); if (!g) return
    g.innerHTML = ''
    g._cells = Array.from({ length: 100 }, () => { const c = document.createElement('span'); g.appendChild(c); return c })
    this.router = 'learned'
    this.once(g, () => { this.setRouter('random'); this.later(() => { this.setRouter('learned'); this.sfx('search') }, 1900) }, 0.4)
  }
  setRouter(m) {
    this.router = m
    const g = this.$('[data-rgrid]'); if (!g || !g._cells) return
    const n = m === 'learned' ? 69 : 49
    ;(this._rtl || []).forEach(id => this.cancel(id)); this._rtl = []
    // One accent: the learned router is marigold; random picks are ink at 25%.
    g._cells.forEach((c, i) => this._rtl.push(this.later(() => { c.style.background = i < n ? (m === 'learned' ? '#ffa41b' : 'rgba(22,17,14,.25)') : ''; c.style.transform = i < n ? 'scale(1)' : 'scale(.86)' }, this.reduce ? 0 : i * 8)))
    const v = this.$('[data-rval]'), cap = this.$('[data-rcap]')
    if (v) v.textContent = String(n)
    if (cap) cap.textContent = m === 'learned' ? "The router predicts each query's rerank gain from 8 retrieval signals: same cost, 20 more points of gain." : 'Picking 49% of queries at random keeps only 49% of the reranking gain.'
    this.$$('[data-rt]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.rt === m)))
  }

  initFire() {
    const cv = this.$('[data-fire]'); if (!cv) return
    this.fcv = cv; this.fctx = cv.getContext('2d'); this.fdots = []
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); this.fw = r.width; this.fh = r.height; cv.width = r.width * d; cv.height = r.height * d; this.fctx.setTransform(d, 0, 0, d, 0, 0) }
    size(); this.listen(window, 'resize', size)
    const a = this.$('[data-fs]'), b = this.$('[data-ft]')
    let raf = 0
    const loop = now => {
      raf = requestAnimationFrame(loop)
      const ctx = this.fctx, w = this.fw, h = this.fh; ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = '#16110e'; ctx.lineWidth = 2; ctx.setLineDash([6, 6])
      ctx.beginPath(); ctx.moveTo(70, h / 2); ctx.lineTo(w * 0.44, h / 2); ctx.quadraticCurveTo(w * 0.62, h * 0.2, w - 90, h * 0.2); ctx.moveTo(w * 0.44, h / 2); ctx.quadraticCurveTo(w * 0.62, h * 0.8, w - 90, h * 0.8); ctx.stroke(); ctx.setLineDash([])
      let s = 0, tc = 0
      for (const d of this.fdots) {
        const p = Math.max(0, Math.min(1, (now - d.t0) / 1500))
        let x, y
        if (p < 0.45) { const q = p / 0.45; x = 70 + (w * 0.44 - 70) * q; y = h / 2 + d.j * 16 }
        else { const q = (p - 0.45) / 0.55, ty = d.stu ? h * 0.2 : h * 0.8, e = q * q * (3 - 2 * q); x = w * 0.44 + (w - 90 - d.px - w * 0.44) * e; y = h / 2 + d.j * 16 * (1 - e) + (ty + d.py - h / 2) * e }
        if (p >= 1) { if (d.stu) s++; else tc++ }
        ctx.fillStyle = d.stu ? '#0f9a94' : '#ec2a7a'; ctx.strokeStyle = '#16110e'; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(x, y, d.stu ? 4 : 6, 0, 6.283); ctx.fill(); ctx.stroke()
      }
      if (a) a.textContent = s
      if (b) b.textContent = tc
    }
    raf = requestAnimationFrame(loop); this.off.push(() => cancelAnimationFrame(raf))
    this.once(cv, () => this.fire(), 0.4)
  }
  fire() {
    if (!this.fcv) return
    const now = performance.now(), flags = [...Array(100).keys()].map(i => i < 68).sort(() => Math.random() - .5)
    this.fdots = flags.map((stu, i) => ({ stu, t0: now + (this.reduce ? -2000 : i * 28), j: Math.random() * 2 - 1, px: Math.random() * (stu ? 110 : 70), py: (Math.random() - .5) * (stu ? 40 : 30) }))
  }

  initPipes() {
    if (this.reduce) return
    this.$$('[data-pipe]').forEach(pipe => {
      const groups = []
      pipe.querySelectorAll('[data-node]').forEach(n => { const k = +n.dataset.node; (groups[k] = groups[k] || []).push(n) })
      const pk = document.createElement('span')
      pk.className = 'pipe__packet'
      pipe.appendChild(pk)
      let vis = false, timer = 0, alive = true
      const ctr = n => { const a = pipe.getBoundingClientRect(), b = n.getBoundingClientRect(); return [b.left - a.left + b.width / 2, b.top - a.top + b.height / 2] }
      const flash = n => { n.style.transition = 'background .15s'; n.style.background = '#ffa41b'; this.later(() => { n.style.background = '' }, 480) }
      const run = () => {
        if (!alive) return
        if (!vis) { timer = this.later(run, 500); return }
        const path = groups.filter(Boolean).map(g => g.length > 1 ? (Math.random() < parseFloat(g[0].dataset.p || '0.5') ? g[0] : g[1]) : g[0])
        let i = 0, prev = ctr(path[0])
        pk.style.opacity = '1'; pk.style.transform = `translate(${prev[0]}px,${prev[1]}px)`; flash(path[0])
        const step = () => {
          if (!alive) return
          i++
          if (i >= path.length) { pk.style.opacity = '0'; timer = this.later(run, 800); return }
          const nx = ctr(path[i])
          const a = pk.animate([{ transform: `translate(${prev[0]}px,${prev[1]}px)` }, { transform: `translate(${nx[0]}px,${nx[1]}px)` }], { duration: 380, easing: 'cubic-bezier(.5,0,.3,1)', fill: 'forwards' })
          prev = nx
          a.onfinish = () => { if (!alive) return; pk.style.transform = `translate(${nx[0]}px,${nx[1]}px)`; flash(path[i]); timer = this.later(step, 160) }
        }
        timer = this.later(step, 220)
      }
      this.io(([e]) => { vis = e.isIntersecting }).observe(pipe)
      run()
      this.off.push(() => { alive = false; this.cancel(timer); pk.remove() })
    })
  }

  initSim() {
    const host = this.$('[data-lanes]'); if (!host) return
    this.Q = [
      ['role?', 'ML / AI engineer, LLM systems'], ['degree?', 'MS CS, Univ. at Buffalo, Dec 2026'],
      ['best result?', '12.2× LLM throughput on one T4'], ['stack?', 'PyTorch · vLLM · FAISS · ONNX · FastAPI'],
      ['reliable?', '0 OOMs under a 4× long-context burst'], ['retrieval?', '+12.6 nDCG@10 over BM25 on BEIR'],
      ['cost?', '68% fewer LLM calls, same accuracy'], ['latency?', 'TTFT 109 s to 150 ms at 32 users'],
      ['contact?', 'rishdevs.work@gmail.com'],
    ]
    host.innerHTML = ''
    this.rows = Array.from({ length: 6 }, () => {
      const r = document.createElement('div'); r.className = 'lane'
      const mk = cls => { const s = document.createElement('span'); s.className = cls; r.appendChild(s); return s }
      const row = { el: r, id: mk('lane__id'), p: mk('lane__p'), o: mk('lane__out'), s: mk('lane__state') }
      host.appendChild(r); return row
    })
    this.reset()
    const iv = setInterval(() => this.tick(), 130)
    this.off.push(() => clearInterval(iv))
    this.updateToggle()
  }
  newReq(row) { const [p, a] = this.Q[this.next++ % this.Q.length]; return { row, id: ++this.seq, p, toks: a.split(' '), i: 0, pre: false, arr: this.t, done: null } }
  reset() { this.t = 0; this.next = 0; this.seq = 0; this.emitted = []; this.ttfts = []; this.lanes = this.rows.map(r => this.newReq(r)) }
  tick() {
    this.t += 130
    const pending = this.lanes.filter(l => l.done === null).sort((a, b) => a.id - b.id)
    const active = this.mode === 'batch' ? pending : pending.slice(0, 1)
    active.forEach(l => {
      if (!l.pre) { l.pre = true; return }
      l.i++; this.emitted.push(this.t)
      if (l.i === 1) { this.ttfts.push(this.t - l.arr); if (this.ttfts.length > 12) this.ttfts.shift() }
      if (l.i >= l.toks.length) l.done = this.t
    })
    this.lanes = this.lanes.map(l => (l.done !== null && this.t - l.done > 1300) ? this.newReq(l.row) : l)
    this.emitted = this.emitted.filter(x => this.t - x < 2000)
    const act = new Set(active)
    this.lanes.forEach(l => {
      const r = l.row, isAct = act.has(l) && l.done === null
      r.id.textContent = '#' + String(l.id).padStart(3, '0'); r.p.textContent = l.p
      if (l.i === 0) { r.o.textContent = isAct ? '▍' : '—' }
      else { r.o.textContent = l.toks.slice(0, l.i).join(' ') + (l.done === null ? ' ▍' : '') }
      let st, state
      if (l.done !== null) { st = 'done'; state = 'is-done' }
      else if (isAct) { st = l.i === 0 ? 'prefill' : 'decode'; state = 'is-active' }
      else { st = 'wait ' + ((this.t - l.arr) / 1000).toFixed(1) + 's'; state = 'is-wait' }
      r.s.textContent = st
      r.el.className = 'lane ' + state
    })
    const q = s => this.$(`[data-stat="${s}"]`)
    const tps = q('tps'), tt = q('ttft'), b = q('batch'), qu = q('queue')
    if (tps) tps.textContent = (this.emitted.length / Math.min(2, this.t / 1000)).toFixed(1)
    if (tt) { const s = [...this.ttfts].sort((a, b) => a - b), med = s.length ? s[Math.floor(s.length / 2)] : null; tt.textContent = med === null ? '—' : med < 1000 ? Math.round(med) + ' ms' : (med / 1000).toFixed(1) + ' s' }
    if (b) b.textContent = String(active.length)
    if (qu) qu.textContent = String(pending.length - active.length)
  }
  setMode(m) { if (m === this.mode) return; this.mode = m; this.reset(); this.updateToggle() }
  updateToggle() {
    this.$$('[data-mode]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.mode === this.mode)))
  }

  // Letters page: POST /api/ask, show the reply in the balloon.
  initLetters() {
    const form = this.$('[data-ask-form]'); if (!form) return
    const ta = form.querySelector('textarea'), send = this.$('[data-ask-send]'), count = this.$('[data-ask-count]')
    const out = this.$('[data-ask-answer]'), src = this.$('[data-ask-src]'), avatar = this.$('[data-ask-avatar]')
    let busy = false, ctrl = null
    const setCount = () => { if (count) count.textContent = `${ta.value.length} / 300` }
    const ask = async q => {
      q = q.trim()
      if (!q) { ta.focus(); return }
      if (busy) return
      busy = true; send.disabled = true; avatar.classList.add('is-sensing')
      out.textContent = 'Reading the mailbag…'; src.textContent = ''
      ctrl = new AbortController()
      try {
        const res = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q }), signal: ctrl.signal })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'request failed')
        out.textContent = data.answer
        src.textContent = data.sources && data.sources.length ? 'From: ' + data.sources.join(' · ') : ''
      } catch (e) {
        if (e.name === 'AbortError') return
        out.textContent = /too many/i.test(e.message) ? 'The mailbag is full for a minute. Try again shortly.' : 'The letter got lost on the way. Try again, or email rishdevs.work@gmail.com.'
      } finally {
        busy = false; send.disabled = false; avatar.classList.remove('is-sensing')
      }
    }
    this.listen(ta, 'input', setCount)
    this.listen(form, 'submit', e => { e.preventDefault(); ask(ta.value) })
    this.listen(ta, 'keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); ask(ta.value) } })
    this.$$('[data-ask]').forEach(card => this.listen(card, 'click', () => { ta.value = card.dataset.ask; setCount(); ask(card.dataset.ask) }))
    this.off.push(() => ctrl && ctrl.abort())
    setCount()
  }
}
