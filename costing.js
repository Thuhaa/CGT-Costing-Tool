/* CGT Costing - shared model & helpers (static, no build step) */
window.CGT = (function () {
  const RATE_DEFAULT = 300; // internal blended day rate

  const PHASES = [
    { key:'scoping', n:'Scoping & strategic alignment', d:'Align on goals, priority groups and scope', base:9, c:'#16304D' },
    { key:'adapt',   n:'Methodological adaptation & workplan', d:'Tailor the CGT to your context', base:13, c:'#006EB5' },
    { key:'supply',  n:'Mapping care supply', d:'Locate every care service', base:23, c:'#009EDB' },
    { key:'demand',  n:'Mapping care demand', d:'Map where care-dependent people live', base:18, c:'#008080' },
    { key:'access',  n:'Accessibility & gap analysis', d:'Reveal the care deserts', base:19, c:'#E8872A' },
    { key:'caremap', n:'Care Map & visualisation', d:'Build your care maps', base:19, c:'#C9A84C' },
    { key:'valid',   n:'Validation & capacity transfer', d:'Validate findings and hand over', base:15, c:'#6B4C9A' },
  ];

  const M = {
    area:{small:1.0, medium:1.2, large:1.5, vlarge:2.0},
    pop:{p1:0.85, p2:1.0, p3:1.3, p4:1.6},
    terrain:{flat:1.0, moderate:1.2, mountain:1.5},
    data:{good:0.8, moderate:1.0, poor:1.5},
    cats:{one:0.85, two:1.0, three:1.25},
    analysis:{foundational:0.85, standard:1.0, comprehensive:1.3},
    reporting:{light:0.9, standard:1.0, comprehensive:1.25},
    support:{handover:0.9, standard:1.1, comprehensive:1.35},
  };
  const SUPPORT_RECUR = {handover:1500, standard:6000, comprehensive:15000};
  const DATA_ACQ = {good:1000, moderate:3000, poor:8000};

  // Regional technical support and travel: confirmed / illustrative, fully editable.
  // Regional support: confirmed range USD 15,000-25,000 (labour only, one-time, set-up
  // phase). Default kept at the low end so client-facing figures stay stable; the range
  // is documented and editable in the internal tool.
  const REGIONAL_SUPPORT_DEFAULT = 15000;
  const REGIONAL_SUPPORT_RANGE = { low: 15000, high: 25000 };

  // Travel: illustrative placeholder (flight + DSA), NOT from a real UN DSA table.
  // Must be checked against the current DSA schedule before use in a real proposal.
  const TRAVEL_DEFAULTS = {
    flightCost: 700,     // USD, economy return, BKK to a regional Asian capital
    dsaPerNight: 200,    // USD/night, placeholder - replace with actual UN DSA rate
    nightsPerMission: 6,
    missions: 2,         // e.g. scoping mission + validation/training mission
    travelers: 1,
  };
  function travelCost(t){
    t = t || TRAVEL_DEFAULTS;
    return (t.flightCost + t.dsaPerNight * t.nightsPerMission) * t.missions * t.travelers;
  }


  const TIERS = {
    foundational:{name:'Foundational', desc:'The essentials: a clear care map and the gaps it reveals.',
      analysis:'foundational', reporting:'light', support:'handover', climate:false, dual:false, rec:true},
    standard:{name:'Standard', desc:'The full picture: climate risk, a public map and a year of support.',
      analysis:'standard', reporting:'standard', support:'standard', climate:true, dual:true},
    comprehensive:{name:'Comprehensive', desc:'Deep analysis, planning tools and ongoing partnership.',
      analysis:'comprehensive', reporting:'comprehensive', support:'comprehensive', climate:true, dual:true},
  };
  const ORDER = ['foundational','standard','comprehensive'];
  const DELIV = {
    foundational:['Care supply, demand & accessibility mapping','Care desert identification','Internal planning map','Summary findings report','Initial team training'],
    standard:['Everything in Foundational','Climate & compound-vulnerability layer','Public citizen-facing map','Equity & inclusion analysis','Policy brief with recommendations','Structured user testing','One year of technical support'],
    comprehensive:['Everything in Standard','Scenario & investment modelling','Custom planning dashboards','Prioritised investment plan','Extended, ongoing support','Repeated capacity building'],
  };

  function compute(o) {
    // o: {areaKey,popKey,terrainKey,dataKey,catsKey,analysisKey,reportingKey,supportKey,climate,dual,rate,
    //     regionalSupport, travel:{flightCost,dsaPerNight,nightsPerMission,missions,travelers}}
    const area=M.area[o.areaKey], pop=M.pop[o.popKey], terrain=M.terrain[o.terrainKey],
          data=M.data[o.dataKey], cats=M.cats[o.catsKey],
          analysis=M.analysis[o.analysisKey], reporting=M.reporting[o.reportingKey], support=M.support[o.supportKey];
    const climate=!!o.climate, dual=!!o.dual, rate=Math.max(50, o.rate||RATE_DEFAULT);
    const days = [
      PHASES[0].base*(1+(area-1)*0.2),
      PHASES[1].base*(1+(cats-1)*0.5),
      PHASES[2].base*pop*data*cats*(1+(area-1)*0.5),
      PHASES[3].base*pop*data*cats*analysis,
      PHASES[4].base*terrain*area*analysis*(climate?1.15:1),
      PHASES[5].base*reporting*(dual?1.35:1),
      PHASES[6].base*data*support*(1+(pop-1)*0.3),
    ];
    const totalDays = days.reduce((a,b)=>a+b,0);
    const labour = totalDays*rate;
    const dataAcq = DATA_ACQ[o.dataKey]*(0.7+cats*0.3) + (climate?2000:0);
    const platform = (dual?6000:2500)+500;
    const regionalSupport = o.regionalSupport!=null ? o.regionalSupport : REGIONAL_SUPPORT_DEFAULT;
    const travel = travelCost(o.travel);
    const setup = labour+dataAcq+platform+regionalSupport+travel;
    const hosting = dual?4000:1500;
    const dataRefresh = totalDays*0.15*rate;
    const maintenance = (dual?20:12)*rate*support;
    const supportR = SUPPORT_RECUR[o.supportKey];
    const recur = hosting+dataRefresh+maintenance+supportR;
    return {days,totalDays,labour,dataAcq,platform,regionalSupport,travel,setup,hosting,dataRefresh,maintenance,supportR,recur,first:setup+recur,five:setup+recur*5,rate};
  }

  function computeTier(tierKey, ctx, rate, regionalSupport, travel) {
    const t = TIERS[tierKey];
    return compute({areaKey:ctx.areaKey,popKey:ctx.popKey,terrainKey:ctx.terrainKey,dataKey:ctx.dataKey,catsKey:ctx.catsKey,
      analysisKey:t.analysis,reportingKey:t.reporting,supportKey:t.support,climate:t.climate,dual:t.dual,
      rate:rate||RATE_DEFAULT, regionalSupport, travel});
  }

  const kfmt = n => '$' + Math.round(n/1000) + 'k';
  const money = n => '$' + (Math.round(n/100)*100).toLocaleString();
  const rng = (e,lo,hi) => kfmt(e*lo) + ' – ' + kfmt(e*hi);

  function lineChart(setup, recur, W, H) {
    W=W||820; H=H||180; const pL=44,pR=16,pT=14,pB=30;
    const ys=[1,2,3,4,5].map(y=>setup+recur*y), max=ys[4]*1.08;
    const xx=i=>pL+(W-pL-pR)*(i/4), yy=v=>H-pB-(H-pT-pB)*(v/max);
    let area='M'+xx(0)+','+(H-pB), line='', dots='', xl='';
    ys.forEach((v,i)=>{area+=' L'+xx(i)+','+yy(v); line+=(i?' L':'M')+xx(i)+','+yy(v);
      dots+=`<circle cx="${xx(i)}" cy="${yy(v)}" r="4.5" fill="#006EB5" stroke="#fff" stroke-width="2"/>`;
      xl+=`<text x="${xx(i)}" y="${H-9}" font-size="11.5" fill="#6B7C90" text-anchor="middle">Year ${i+1}</text>`;});
    area+=' L'+xx(4)+','+(H-pB)+' Z';
    let yl=''; for(let g=0;g<=2;g++){const v=max*g/2,y=yy(v);
      yl+=`<line x1="${pL}" y1="${y}" x2="${W-pR}" y2="${y}" stroke="#EDF2F8"/><text x="${pL-7}" y="${y+4}" font-size="10.5" fill="#9AABBC" text-anchor="end">${kfmt(v)}</text>`;}
    return `<svg viewBox="0 0 ${W} ${H}" width="100%"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#006EB5" stop-opacity="0.20"/><stop offset="1" stop-color="#006EB5" stop-opacity="0"/></linearGradient></defs>${yl}<path d="${area}" fill="url(#ag)"/><path d="${line}" fill="none" stroke="#006EB5" stroke-width="2.5"/>${dots}${xl}</svg>`;
  }

  function animate(el,to,fmt){const from=el._cur||0,s=performance.now();function st(t){const k=Math.min(1,(t-s)/450),e=1-Math.pow(1-k,3),v=from+(to-from)*e;el.textContent=fmt(v);if(k<1)requestAnimationFrame(st);else el._cur=to;}requestAnimationFrame(st);}

  function initModals(){
    document.querySelectorAll('[data-modal-open]').forEach(b=>{
      b.addEventListener('click',()=>{const m=document.getElementById('modal-'+b.dataset.modalOpen); if(m) m.classList.add('is-active');});
    });
    document.querySelectorAll('[data-modal-close]').forEach(b=>{
      b.addEventListener('click',()=>{const m=b.closest('.modal'); if(m) m.classList.remove('is-active');});
    });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') document.querySelectorAll('.modal.is-active').forEach(m=>m.classList.remove('is-active')); });
  }

  const PRESETS = {
    thimphu:{areaKey:'medium',popKey:'p2',terrainKey:'mountain',dataKey:'poor',catsKey:'two'},
    selangor:{areaKey:'large',popKey:'p4',terrainKey:'moderate',dataKey:'moderate',catsKey:'two'},
    bhubaneswar:{areaKey:'medium',popKey:'p3',terrainKey:'flat',dataKey:'moderate',catsKey:'one'},
  };

  return {RATE_DEFAULT,PHASES,M,SUPPORT_RECUR,DATA_ACQ,TIERS,ORDER,DELIV,PRESETS,
          REGIONAL_SUPPORT_DEFAULT,REGIONAL_SUPPORT_RANGE,TRAVEL_DEFAULTS,travelCost,
          compute,computeTier,kfmt,money,rng,lineChart,animate,initModals};
})();
