import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const spirits = [
  { id: 'gin', name: 'Gin', chinese: '金酒', icon: '🌿', description: '杜松子、草本、柑橘' },
  { id: 'vodka', name: 'Vodka', chinese: '伏特加', icon: '❄️', description: '纯净、中性、清爽' },
  { id: 'rum', name: 'Rum', chinese: '朗姆酒', icon: '🏝️', description: '甘蔗、焦糖、热带气息' },
  { id: 'tequila', name: 'Tequila', chinese: '龙舌兰', icon: '🌵', description: '植物、胡椒、矿物感' },
  { id: 'whisky', name: 'Whisky', chinese: '威士忌', icon: '🥃', description: '木桶、谷物、香料' },
  { id: 'brandy', name: 'Brandy', chinese: '白兰地', icon: '🍇', description: '葡萄、果干、温暖醇厚' },
]

const ingredients = [
  { id: 'lemon-juice', name: 'Lemon Juice', chinese: '柠檬汁', icon: '🍋', category: '酸味', role: '提供明亮酸度，削弱甜腻感，让酒体更加清爽。' },
  { id: 'lime-juice', name: 'Lime Juice', chinese: '青柠汁', icon: '🟢', category: '酸味', role: '酸度更尖锐，并带有青绿果香，常用于热带风格鸡尾酒。' },
  { id: 'orange-juice', name: 'Orange Juice', chinese: '橙汁', icon: '🍊', category: '果汁', role: '增加柔和甜感和柑橘果香，同时降低基酒的刺激感。' },
  { id: 'sugar-syrup', name: 'Sugar Syrup', chinese: '糖浆', icon: '🍯', category: '甜味', role: '平衡柠檬或青柠的酸度，使整体口感更加圆润。' },
  { id: 'honey-syrup', name: 'Honey Syrup', chinese: '蜂蜜糖浆', icon: '🐝', category: '甜味', role: '增加甜度、花香和厚度，口感比普通糖浆更温暖。' },
  { id: 'mint', name: 'Mint', chinese: '薄荷', icon: '🌱', category: '香草', role: '增加清凉感和草本香气，让鸡尾酒更轻盈、清新。' },
  { id: 'soda-water', name: 'Soda Water', chinese: '苏打水', icon: '🫧', category: '气泡', role: '延长酒体、降低酒精强度，并增加清爽的气泡感。' },
  { id: 'tonic-water', name: 'Tonic Water', chinese: '汤力水', icon: '💧', category: '气泡', role: '带来气泡和奎宁苦味，尤其适合搭配金酒。' },
  { id: 'cola', name: 'Cola', chinese: '可乐', icon: '🥤', category: '碳酸', role: '增加甜味、焦糖香和香料感，同时弱化烈酒刺激。' },
  { id: 'campari', name: 'Campari', chinese: '金巴利苦味酒', icon: '🔴', category: '苦味', role: '提供强烈苦味、柑橘皮和草本香，是苦味鸡尾酒的核心。' },
  { id: 'triple-sec', name: 'Triple Sec', chinese: '橙味利口酒', icon: '🍊', category: '利口酒', role: '增加橙皮香、甜味和酒体，是玛格丽特等酒款的重要材料。' },
  { id: 'egg-white', name: 'Egg White', chinese: '蛋清', icon: '🥚', category: '质地', role: '不明显改变味道，主要增加泡沫、顺滑感和绵密质地。' },
  { id: 'sweet-vermouth', name: 'Sweet Vermouth', chinese: '甜味美思', icon: '🍷', category: '加香酒', role: '增加草本、香料和柔和甜感，是内格罗尼与曼哈顿的重要结构原料。' },
  { id: 'dry-vermouth', name: 'Dry Vermouth', chinese: '干味美思', icon: '🌾', category: '加香酒', role: '带来轻盈草本、葡萄酒香和干爽感，是干马天尼的关键搭配。' },
  { id: 'aromatic-bitters', name: 'Aromatic Bitters', chinese: '芳香苦精', icon: '🟤', category: '苦精', role: '用量很少，却能补充香料、草本和苦味，让整体结构更完整。' },
  { id: 'ginger-beer', name: 'Ginger Beer', chinese: '姜汁啤酒', icon: '🫚', category: '气泡', role: '提供辛辣姜香、甜感和气泡，是莫斯科骡子的核心辅料。' },
  { id: 'cranberry-juice', name: 'Cranberry Juice', chinese: '蔓越莓汁', icon: '🫐', category: '果汁', role: '提供红色果香、轻微酸涩与颜色，是大都会的标志性辅料。' },
  { id: 'grenadine', name: 'Grenadine', chinese: '红石榴糖浆', icon: '🔻', category: '甜味', role: '带来红色渐层、甜味和果香，常用于日出类鸡尾酒。' },
  { id: 'cream', name: 'Cream', chinese: '奶油', icon: '🥛', category: '质地', role: '增加奶香、厚度和丝滑感，适合甜点型鸡尾酒。' },
  { id: 'cacao-liqueur', name: 'Crème de Cacao', chinese: '可可利口酒', icon: '🍫', category: '利口酒', role: '增加巧克力、香草和甜感，是白兰地亚历山大的核心风味。' },
]

const ingredientMap = Object.fromEntries(ingredients.map((item) => [item.id, item]))

const techniques = [
  {
    id: 'shake',
    name: 'Shake',
    chinese: '摇和',
    icon: '🧊',
    tagline: '快速降温 · 充分融合 · 增加空气感',
    role: '把原料与冰块放入摇酒壶中快速摇动。适合含果汁、糖浆、奶油或蛋清的配方。',
    effects: ['降温强', '稀释较高', '可能产生泡沫'],
  },
  {
    id: 'stir',
    name: 'Stir',
    chinese: '搅拌',
    icon: '🥄',
    tagline: '保持清澈 · 口感顺滑 · 突出酒香',
    role: '在调酒杯中加入冰块后轻柔搅拌。适合以烈酒和利口酒为主、需要保持清澈的配方。',
    effects: ['降温稳定', '稀释可控', '保持通透'],
  },
  {
    id: 'build',
    name: 'Build',
    chinese: '直调',
    icon: '🥃',
    tagline: '杯中完成 · 简洁直接 · 保留气泡',
    role: '直接在最终饮用杯中依次加入原料。适合苏打水、汤力水、可乐等含气泡的长饮。',
    effects: ['操作简单', '气泡保留', '层次较直接'],
  },
]

const glasses = [
  {
    id: 'highball',
    name: 'Highball',
    chinese: '高球杯',
    description: '适合长饮、苏打和气泡类鸡尾酒，视觉清爽修长。',
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    chinese: '古典杯',
    description: '适合短饮和酒感较强的配方，稳重、集中。',
  },
  {
    id: 'martini',
    name: 'Martini',
    chinese: '马天尼杯',
    description: '突出香气与仪式感，适合经典烈酒型鸡尾酒。',
  },
  {
    id: 'coupe',
    name: 'Coupe',
    chinese: '浅碟杯',
    description: '优雅柔和，适合摇和后的酸甜型鸡尾酒。',
  },
]



function hexToRgb(hex) {
  const safe = hex.replace('#', '')
  const value =
    safe.length === 3
      ? safe
          .split('')
          .map((char) => char + char)
          .join('')
      : safe

  const int = Number.parseInt(value, 16)

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  }
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixHex(baseHex, targetHex, ratio) {
  const base = hexToRgb(baseHex)
  const target = hexToRgb(targetHex)

  return rgbToHex({
    r: base.r + (target.r - base.r) * ratio,
    g: base.g + (target.g - base.g) * ratio,
    b: base.b + (target.b - base.b) * ratio,
  })
}

function getDrinkAppearance(spirit, selectedIngredients, selectedTechnique) {
  const ids = selectedIngredients.map((item) => item.id)

  const palettes = {
    whisky: {
      top: '#d7a157',
      mid: '#bb7332',
      bottom: '#834517',
      glow: '#e1ae68',
      family: 'amber',
      note: '琥珀金',
    },
    brandy: {
      top: '#deb179',
      mid: '#b8743f',
      bottom: '#814a26',
      glow: '#e7b37a',
      family: 'amber',
      note: '陈年琥珀',
    },
    rum: {
      top: '#ead9a1',
      mid: '#cf9f56',
      bottom: '#9a6328',
      glow: '#efd38f',
      family: 'gold',
      note: '金朗姆色',
    },
    tequila: {
      top: '#f0de95',
      mid: '#d9b863',
      bottom: '#ac8134',
      glow: '#f3dd96',
      family: 'gold',
      note: '日照金黄',
    },
    gin: {
      top: '#f1f1dc',
      mid: '#dddcb2',
      bottom: '#b9c18d',
      glow: '#f6f4e6',
      family: 'crystal',
      note: '清透草本',
    },
    vodka: {
      top: '#f4eee7',
      mid: '#e6ddcf',
      bottom: '#d2c6b7',
      glow: '#faf5f0',
      family: 'crystal',
      note: '冰雾淡金',
    },
  }

  const appearance = { ...(palettes[spirit?.id] ?? palettes.gin) }

  const influenceRules = [
    { id: 'cola', top: '#8f6043', mid: '#573728', bottom: '#22130f', family: 'cola', note: '可乐深棕' },
    { id: 'cranberry-juice', top: '#f2cedc', mid: '#d57a9b', bottom: '#9d365d', family: 'berry', note: '莓果粉' },
    { id: 'grenadine', top: '#f5bf7b', mid: '#de6b54', bottom: '#bb3344', family: 'sunrise', note: '日出橙红' },
    { id: 'campari', top: '#dc7057', mid: '#b93d34', bottom: '#7b2020', family: 'ruby', note: '深红宝石' },
    { id: 'mint', top: '#dceab7', mid: '#b4cf7b', bottom: '#83a95f', family: 'herbal', note: '薄荷青绿' },
    { id: 'lime-juice', top: '#eef0b6', mid: '#c8d57b', bottom: '#a0b15b', family: 'herbal', note: '青柠薄荷绿' },
    { id: 'lemon-juice', top: '#f4e7ac', mid: '#e6d07b', bottom: '#c5a751', family: 'citrus', note: '柠檬香槟金' },
    { id: 'orange-juice', top: '#f5d892', mid: '#efb058', bottom: '#d27a30', family: 'citrus', note: '橙皮金橘' },
    { id: 'triple-sec', top: '#f5dca0', mid: '#ebb86a', bottom: '#cb7a32', family: 'citrus', note: '橙皮金橘' },
    { id: 'ginger-beer', top: '#ead79d', mid: '#c8aa68', bottom: '#926e3e', family: 'spice', note: '姜汁稻草金' },
    { id: 'egg-white', top: '#f3e8d3', mid: '#e1ca96', bottom: '#bc8d4a', family: 'foam', note: '丝绒酸酒色' },
    { id: 'cream', top: '#f0dfcc', mid: '#ccb094', bottom: '#906a55', family: 'velvet', note: '奶油咖棕' },
    { id: 'cacao-liqueur', top: '#d8bea8', mid: '#aa8468', bottom: '#704935', family: 'velvet', note: '可可奶棕' },
    { id: 'sweet-vermouth', top: '#d8a36b', mid: '#aa6438', bottom: '#6f3d26', family: 'amber', note: '香料琥珀' },
    { id: 'dry-vermouth', top: '#efe6be', mid: '#d8c890', bottom: '#ab9b66', family: 'crystal', note: '干爽稻金' },
    { id: 'aromatic-bitters', top: '#dfa864', mid: '#b76732', bottom: '#7a401e', family: 'amber', note: '苦精琥珀' },
    { id: 'sugar-syrup', top: '#f0ddab', mid: '#ddbe79', bottom: '#b88e49', family: 'gold', note: '蜂蜜金' },
    { id: 'honey-syrup', top: '#f1d796', mid: '#d9aa4d', bottom: '#b07625', family: 'gold', note: '蜂蜜金' },
    { id: 'soda-water', top: '#f6eed4', mid: '#e3d5b4', bottom: '#cbb995', family: 'crystal', note: '轻盈微澄' },
    { id: 'tonic-water', top: '#f5ecd1', mid: '#ddd2ae', bottom: '#c1b48d', family: 'crystal', note: '清透微苦' },
  ]

  ids.forEach((id) => {
    const rule = influenceRules.find((item) => item.id === id)
    if (!rule) return

    let ratio = 0.18
    if (['cola', 'cranberry-juice', 'grenadine', 'campari'].includes(id)) ratio = 0.34
    if (['orange-juice', 'triple-sec', 'lemon-juice', 'lime-juice'].includes(id)) ratio = 0.24
    if (['egg-white', 'cream', 'cacao-liqueur'].includes(id)) ratio = 0.28

    appearance.top = mixHex(appearance.top, rule.top, ratio)
    appearance.mid = mixHex(appearance.mid, rule.mid, ratio + 0.03)
    appearance.bottom = mixHex(appearance.bottom, rule.bottom, ratio + 0.05)
    appearance.glow = mixHex(appearance.glow, rule.top, ratio * 0.7)
    appearance.family = rule.family
    appearance.note = rule.note
  })

  if (ids.includes('grenadine') && ids.includes('orange-juice')) {
    appearance.family = 'sunrise'
    appearance.note = '日出橙红'
    appearance.top = '#f6d58a'
    appearance.mid = '#ee9a54'
    appearance.bottom = '#c64649'
  }

  if (ids.includes('mint') && ids.includes('lime-juice')) {
    appearance.family = 'herbal'
    appearance.note = '青柠薄荷绿'
  }

  if (ids.includes('cola')) {
    appearance.family = 'cola'
    appearance.note = '可乐深棕'
  }

  if (selectedTechnique?.id === 'shake') {
    appearance.top = mixHex(appearance.top, '#fff4de', 0.08)
  }

  return appearance
}

function getDrinkEffects(selectedIngredients, selectedTechnique, appearance) {
  const ids = selectedIngredients.map((item) => item.id)
  const bubbly =
    ids.includes('soda-water') ||
    ids.includes('tonic-water') ||
    ids.includes('cola') ||
    ids.includes('ginger-beer')

  const foamy =
    (ids.includes('egg-white') && selectedTechnique?.id === 'shake') ||
    ids.includes('cream')

  let garnishType = ''
  if (ids.includes('mint')) garnishType = 'mint'
  else if (ids.includes('lime-juice')) garnishType = 'lime'
  else if (ids.includes('lemon-juice')) garnishType = 'lemon'
  else if (ids.includes('orange-juice') || ids.includes('triple-sec')) garnishType = 'orange'
  else if (ids.includes('cranberry-juice') || ids.includes('grenadine')) garnishType = 'cherry'
  else if (ids.includes('dry-vermouth')) garnishType = 'olive'

  return {
    bubbly,
    foamy,
    garnishType,
    milky: ids.includes('cream'),
    salted: ids.includes('lime-juice') && selectedTechnique?.id === 'shake',
    layered:
      ['sunrise', 'berry', 'citrus', 'amber', 'herbal', 'velvet'].includes(
        appearance?.family,
      ),
    topGlow: appearance?.top,
    midGlow: appearance?.mid,
    bottomGlow: appearance?.bottom,
    colorNote: appearance?.note ?? '金琥珀',
  }
}

function PhysicalGarnish({ type }) {
  if (!type) return null

  if (type === 'mint') {
    return (
      <span className="garnish garnish-mint" aria-hidden="true">
        <i className="leaf leaf-one" />
        <i className="leaf leaf-two" />
      </span>
    )
  }

  if (type === 'cherry') {
    return (
      <span className="garnish garnish-cherry" aria-hidden="true">
        <i className="cherry-stem" />
        <i className="cherry-fruit" />
      </span>
    )
  }

  if (type === 'olive') {
    return (
      <span className="garnish garnish-olive" aria-hidden="true">
        <i className="olive-stick" />
        <i className="olive-fruit" />
      </span>
    )
  }

  return (
    <span className={`garnish garnish-slice garnish-${type}`} aria-hidden="true">
      <i className="slice-rind" />
      <i className="slice-core" />
    </span>
  )
}

function DrinkDetails({ effects }) {
  return (
    <>
      {effects.layered && (
        <>
          <span
            className="drink-layer layer-top"
            style={{ background: `linear-gradient(180deg, ${effects.topGlow}dd, transparent)` }}
          />
          <span
            className="drink-layer layer-mid"
            style={{ background: `linear-gradient(180deg, ${effects.midGlow}80, transparent)` }}
          />
          <span
            className="drink-layer layer-bottom"
            style={{ background: `linear-gradient(180deg, transparent, ${effects.bottomGlow}75)` }}
          />
        </>
      )}
      {effects.foamy && <span className="drink-foam" />}
      {effects.bubbly && (
        <span className="drink-bubbles" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
      <PhysicalGarnish type={effects.garnishType} />
      {effects.salted && <span className="glass-salt-rim" aria-hidden="true" />}
      <span className="liquid-specular" aria-hidden="true" />
    </>
  )
}

function GlassPreview({ type, color, effects }) {
  const appearance =
    typeof color === 'string'
      ? {
          top: color,
          mid: color,
          bottom: color,
          glow: color,
        }
      : color

  const liquidStyle = {
    background: `linear-gradient(180deg, ${appearance.top}f0 0%, ${appearance.mid}d9 48%, ${appearance.bottom} 100%)`,
    boxShadow: `inset 0 16px 24px rgba(255,255,255,0.12), inset 0 -20px 36px rgba(0,0,0,0.16), 0 0 22px ${appearance.glow}22`,
  }

  if (type === 'highball') {
    return (
      <div className="glass-stage">
        <div className="glass-highball">
          <div className="liquid highball-liquid" style={liquidStyle}>
            <DrinkDetails effects={effects} />
          </div>
          <div className="glass-shine" />
        </div>
        <span className="glass-shadow" />
      </div>
    )
  }

  if (type === 'old-fashioned') {
    return (
      <div className="glass-stage">
        <div className="glass-oldfashioned">
          <span className="ice-cube ice-one" />
          <span className="ice-cube ice-two" />
          <div className="liquid oldfashioned-liquid" style={liquidStyle}>
            <DrinkDetails effects={effects} />
          </div>
          <div className="glass-shine" />
        </div>
        <span className="glass-shadow wide" />
      </div>
    )
  }

  if (type === 'martini') {
    return (
      <div className="glass-stage stemmed-stage">
        <div className="glass-martini-bowl">
          <div className="martini-liquid" style={liquidStyle}>
            <DrinkDetails effects={effects} />
          </div>
          <div className="martini-rim-highlight" />
        </div>
        <div className="glass-stem" />
        <div className="glass-base" />
        <span className="glass-shadow stem-shadow" />
      </div>
    )
  }

  return (
    <div className="glass-stage stemmed-stage">
      <div className="glass-coupe-bowl">
        <div className="coupe-liquid" style={liquidStyle}>
          <DrinkDetails effects={effects} />
        </div>
        <div className="coupe-rim-highlight" />
      </div>
      <div className="glass-stem" />
      <div className="glass-base" />
      <span className="glass-shadow stem-shadow" />
    </div>
  )
}


const localCocktailPhotos = [
  {
    id: 'amber-orange',
    src: '/cocktails/amber-orange-cocktail-glass.png',
    spiritAny: ['whisky', 'brandy', 'rum'],
    ingredientAny: ['aromatic-bitters', 'sweet-vermouth', 'orange-juice', 'triple-sec'],
    families: ['amber', 'gold', 'citrus'],
  },
  {
    id: 'martini',
    src: '/cocktails/classic-olive-martini.png',
    spiritAny: ['gin', 'vodka'],
    ingredientAny: ['dry-vermouth'],
    families: ['crystal'],
    glasses: ['martini'],
  },
  {
    id: 'mule',
    src: '/cocktails/copper-mint-lime-cocktail.png',
    spiritAny: ['vodka', 'rum', 'tequila'],
    ingredientAny: ['ginger-beer', 'lime-juice', 'mint'],
    families: ['spice', 'herbal'],
  },
  {
    id: 'champagne-citrus',
    src: '/cocktails/lemon-champagne-bar.png',
    spiritAny: ['gin', 'vodka', 'rum', 'tequila'],
    ingredientAny: ['lemon-juice', 'soda-water', 'tonic-water'],
    families: ['citrus', 'crystal', 'gold'],
  },
  {
    id: 'mojito',
    src: '/cocktails/mojito-highball-bar.png',
    spiritAny: ['rum', 'gin', 'vodka'],
    ingredientAny: ['mint', 'lime-juice', 'soda-water'],
    ingredientAll: ['mint', 'lime-juice'],
    families: ['herbal'],
    glasses: ['highball'],
  },
  {
    id: 'berry',
    src: '/cocktails/pastel-berry-cocktail.png',
    spiritAny: ['vodka', 'gin', 'rum', 'tequila'],
    ingredientAny: ['cranberry-juice', 'grenadine'],
    families: ['berry', 'sunrise', 'ruby'],
  },
  {
    id: 'margarita',
    src: '/cocktails/salt-rim-lime-margarita.png',
    spiritAny: ['tequila'],
    ingredientAny: ['lime-juice', 'triple-sec'],
    ingredientAll: ['lime-juice', 'triple-sec'],
    families: ['citrus', 'herbal'],
    glasses: ['coupe', 'martini'],
  },
  {
    id: 'whisky-orange',
    src: '/cocktails/whisky-orange-closeup.png',
    spiritAny: ['whisky', 'brandy'],
    ingredientAny: ['orange-juice', 'aromatic-bitters', 'cola'],
    families: ['amber', 'cola'],
    glasses: ['old-fashioned'],
  },
]

function hashLocalPhoto(value) {
  return String(value || '')
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function pickLocalCocktailPhoto({
  spirit,
  ingredients,
  appearance,
  glass,
  signature,
}) {
  const ingredientIds = ingredients.map((item) => item.id)

  const ranked = localCocktailPhotos
    .map((photo) => {
      let score = 0

      if (photo.spiritAny?.includes(spirit?.id)) score += 9
      if (photo.families?.includes(appearance?.family)) score += 9
      if (photo.glasses?.includes(glass?.id)) score += 8

      if (photo.ingredientAny) {
        score +=
          photo.ingredientAny.filter((id) => ingredientIds.includes(id)).length *
          5
      }

      if (
        photo.ingredientAll &&
        photo.ingredientAll.every((id) => ingredientIds.includes(id))
      ) {
        score += photo.ingredientAll.length * 8
      }

      if (photo.id === 'whisky-orange' && ingredientIds.includes('cola')) {
        score += 14
      }

      if (
        photo.id === 'berry' &&
        ingredientIds.some((id) =>
          ['cranberry-juice', 'grenadine'].includes(id),
        )
      ) {
        score += 12
      }

      if (
        photo.id === 'mojito' &&
        ingredientIds.includes('mint') &&
        ingredientIds.includes('lime-juice')
      ) {
        score += 14
      }

      if (
        photo.id === 'margarita' &&
        spirit?.id === 'tequila' &&
        ingredientIds.includes('lime-juice')
      ) {
        score += 12
      }

      return { ...photo, score }
    })
    .sort((a, b) => b.score - a.score)

  const topScore = ranked[0]?.score ?? 0
  const finalists = ranked.filter((photo) => photo.score >= topScore - 2)
  return (
    finalists[hashLocalPhoto(signature) % Math.max(finalists.length, 1)] ??
    ranked[0]
  )
}

function CocktailPhotoResult({
  drinkName,
  appearance,
  glass,
  spirit,
  ingredients,
  signature,
}) {
  const photo = pickLocalCocktailPhoto({
    spirit,
    ingredients,
    appearance,
    glass,
    signature,
  })

  return (
    <div className={`real-photo-result local-photo-result scene-${appearance.family}`}>
      <img src={photo.src} alt={`${drinkName}的酒吧成品照`} />
      <div className="real-photo-overlay" />
      <div className="real-photo-caption">
        <small>LOCAL BAR PHOTO</small>
        <strong>{drinkName}</strong>
      </div>
      <p className="real-photo-disclaimer">
        配方视觉示意，实际外观会受原料品牌、比例和操作影响。
      </p>
    </div>
  )
}

const cocktails = [
  {
    id: 'dry-martini',
    name: 'Dry Martini',
    chinese: '干马天尼',
    spirit: 'gin',
    ingredients: ['dry-vermouth'],
    coreIngredients: ['dry-vermouth'],
    technique: 'stir',
    glasses: ['martini'],
    flavor: { sweet: 8, sour: 2, bitter: 18, spirit: 92, fruity: 12, herbal: 72 },
    description: '极度干爽、酒感清晰，以杜松子和加香酒草本香为主，收尾利落。',
  },
  {
    id: 'negroni',
    name: 'Negroni',
    chinese: '内格罗尼',
    spirit: 'gin',
    ingredients: ['campari', 'sweet-vermouth'],
    coreIngredients: ['campari', 'sweet-vermouth'],
    technique: 'stir',
    glasses: ['old-fashioned'],
    flavor: { sweet: 42, sour: 4, bitter: 88, spirit: 72, fruity: 38, herbal: 86 },
    description: '苦甜鲜明，柑橘皮与草本香浓郁，酒体饱满，余味悠长。',
  },
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    chinese: '大都会',
    spirit: 'vodka',
    ingredients: ['cranberry-juice', 'triple-sec', 'lime-juice'],
    coreIngredients: ['cranberry-juice', 'triple-sec', 'lime-juice'],
    technique: 'shake',
    glasses: ['coupe', 'martini'],
    flavor: { sweet: 46, sour: 58, bitter: 8, spirit: 48, fruity: 82, herbal: 6 },
    description: '酸甜明快，蔓越莓与橙皮香突出，酒感适中，整体轻盈利落。',
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    chinese: '莫斯科骡子',
    spirit: 'vodka',
    ingredients: ['ginger-beer', 'lime-juice'],
    coreIngredients: ['ginger-beer', 'lime-juice'],
    technique: 'build',
    glasses: ['highball'],
    flavor: { sweet: 40, sour: 48, bitter: 8, spirit: 38, fruity: 40, herbal: 28 },
    description: '姜香辛辣、气泡清爽，青柠带来明亮酸度，适合轻松畅饮。',
  },
  {
    id: 'mojito',
    name: 'Mojito',
    chinese: '莫吉托',
    spirit: 'rum',
    ingredients: ['lime-juice', 'mint', 'sugar-syrup', 'soda-water'],
    coreIngredients: ['lime-juice', 'mint', 'soda-water'],
    technique: 'build',
    glasses: ['highball'],
    flavor: { sweet: 44, sour: 52, bitter: 5, spirit: 36, fruity: 48, herbal: 92 },
    description: '薄荷与青柠清新突出，酸甜平衡，气泡让酒体轻快爽口。',
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    chinese: '代基里',
    spirit: 'rum',
    ingredients: ['lime-juice', 'sugar-syrup'],
    coreIngredients: ['lime-juice', 'sugar-syrup'],
    technique: 'shake',
    glasses: ['coupe'],
    flavor: { sweet: 42, sour: 68, bitter: 4, spirit: 58, fruity: 60, herbal: 6 },
    description: '结构简洁，朗姆的甘蔗香与青柠酸度直接碰撞，清爽而有力度。',
  },
  {
    id: 'margarita',
    name: 'Margarita',
    chinese: '玛格丽特',
    spirit: 'tequila',
    ingredients: ['triple-sec', 'lime-juice'],
    coreIngredients: ['triple-sec', 'lime-juice'],
    technique: 'shake',
    glasses: ['coupe', 'martini'],
    flavor: { sweet: 38, sour: 72, bitter: 7, spirit: 62, fruity: 70, herbal: 18 },
    description: '青柠酸度明亮，橙皮香圆润，龙舌兰的植物与胡椒感清晰。',
  },
  {
    id: 'tequila-sunrise',
    name: 'Tequila Sunrise',
    chinese: '龙舌兰日出',
    spirit: 'tequila',
    ingredients: ['orange-juice', 'grenadine'],
    coreIngredients: ['orange-juice', 'grenadine'],
    technique: 'build',
    glasses: ['highball'],
    flavor: { sweet: 62, sour: 24, bitter: 4, spirit: 38, fruity: 92, herbal: 10 },
    description: '橙汁果香柔和，石榴糖浆带来甜感与渐层色泽，容易入口。',
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    chinese: '古典鸡尾酒',
    spirit: 'whisky',
    ingredients: ['sugar-syrup', 'aromatic-bitters'],
    coreIngredients: ['aromatic-bitters'],
    technique: 'stir',
    glasses: ['old-fashioned'],
    flavor: { sweet: 28, sour: 2, bitter: 32, spirit: 94, fruity: 14, herbal: 32 },
    description: '以威士忌为绝对主体，甜味与苦精只负责修饰，酒感浓郁而温暖。',
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    chinese: '威士忌酸',
    spirit: 'whisky',
    ingredients: ['lemon-juice', 'sugar-syrup', 'egg-white'],
    coreIngredients: ['lemon-juice', 'sugar-syrup'],
    technique: 'shake',
    glasses: ['old-fashioned', 'coupe'],
    flavor: { sweet: 46, sour: 66, bitter: 8, spirit: 56, fruity: 48, herbal: 8 },
    description: '柠檬酸度与糖浆形成平衡，威士忌提供木桶香，蛋清令口感更绵密。',
  },
  {
    id: 'sidecar',
    name: 'Sidecar',
    chinese: '边车',
    spirit: 'brandy',
    ingredients: ['triple-sec', 'lemon-juice'],
    coreIngredients: ['triple-sec', 'lemon-juice'],
    technique: 'shake',
    glasses: ['coupe'],
    flavor: { sweet: 38, sour: 64, bitter: 6, spirit: 62, fruity: 72, herbal: 8 },
    description: '白兰地果干香与橙皮、柠檬形成成熟的酸甜结构，干净而优雅。',
  },
  {
    id: 'brandy-alexander',
    name: 'Brandy Alexander',
    chinese: '白兰地亚历山大',
    spirit: 'brandy',
    ingredients: ['cacao-liqueur', 'cream'],
    coreIngredients: ['cacao-liqueur', 'cream'],
    technique: 'shake',
    glasses: ['coupe'],
    flavor: { sweet: 76, sour: 2, bitter: 14, spirit: 38, fruity: 28, herbal: 4 },
    description: '奶油与可可带来浓郁甜点感，白兰地提供温暖果香，丝滑柔顺。',
  },
]


const cocktailPhotoLibrary = [
  {
    id: 'martini-olive',
    src: '/cocktails/classic-olive-martini.png',
    alt: '冷冽的经典橄榄马提尼',
    spirits: ['gin', 'vodka'],
    classicIds: ['dry-martini'],
    ingredientAll: ['dry-vermouth'],
    scoreBase: 14,
  },
  {
    id: 'margarita-salt',
    src: '/cocktails/salt-rim-lime-margarita.png',
    alt: '带盐边和青柠的玛格丽塔',
    spirits: ['tequila'],
    classicIds: ['margarita'],
    ingredientAny: ['lime-juice', 'triple-sec'],
    scoreBase: 14,
  },
  {
    id: 'mojito-highball',
    src: '/cocktails/mojito-highball-bar.png',
    alt: '高杯薄荷青柠风格鸡尾酒',
    spirits: ['rum'],
    classicIds: ['mojito'],
    ingredientAll: ['mint', 'lime-juice'],
    ingredientAny: ['soda-water'],
    scoreBase: 14,
  },
  {
    id: 'mule-copper',
    src: '/cocktails/copper-mint-lime-cocktail.png',
    alt: '铜杯青柠薄荷风格鸡尾酒',
    spirits: ['vodka', 'rum'],
    classicIds: ['moscow-mule'],
    ingredientAny: ['ginger-beer', 'lime-juice', 'mint'],
    scoreBase: 12,
  },
  {
    id: 'whisky-orange',
    src: '/cocktails/whisky-orange-closeup.png',
    alt: '琥珀色威士忌鸡尾酒，带橙皮香',
    spirits: ['whisky', 'brandy'],
    classicIds: ['old-fashioned'],
    ingredientAny: ['aromatic-bitters', 'orange-juice', 'triple-sec'],
    scoreBase: 13,
  },
  {
    id: 'amber-orange',
    src: '/cocktails/amber-orange-cocktail-glass.png',
    alt: '复古琥珀橙香鸡尾酒',
    spirits: ['whisky', 'brandy', 'tequila'],
    classicIds: ['whiskey-sour', 'sidecar', 'brandy-alexander'],
    ingredientAny: ['lemon-juice', 'triple-sec', 'cream', 'orange-juice'],
    scoreBase: 11,
  },
  {
    id: 'lemon-champagne',
    src: '/cocktails/lemon-champagne-bar.png',
    alt: '浅金色柠檬酸感鸡尾酒',
    spirits: ['gin', 'vodka', 'rum', 'brandy'],
    classicIds: ['daiquiri', 'sidecar', 'whiskey-sour'],
    ingredientAny: ['lemon-juice', 'lime-juice', 'triple-sec'],
    scoreBase: 10,
  },
  {
    id: 'pastel-berry',
    src: '/cocktails/pastel-berry-cocktail.png',
    alt: '粉彩莓果鸡尾酒',
    spirits: ['vodka', 'gin', 'tequila'],
    classicIds: ['cosmopolitan', 'tequila-sunrise'],
    ingredientAny: ['cranberry-juice', 'grenadine', 'orange-juice'],
    scoreBase: 12,
  },
]

const classicPhotoMap = {
  'dry-martini': '/cocktails/classic-olive-martini.png',
  negroni: '/cocktails/amber-orange-cocktail-glass.png',
  cosmopolitan: '/cocktails/pastel-berry-cocktail.png',
  'moscow-mule': '/cocktails/copper-mint-lime-cocktail.png',
  mojito: '/cocktails/mojito-highball-bar.png',
  daiquiri: '/cocktails/lemon-champagne-bar.png',
  margarita: '/cocktails/salt-rim-lime-margarita.png',
  'tequila-sunrise': '/cocktails/pastel-berry-cocktail.png',
  'old-fashioned': '/cocktails/whisky-orange-closeup.png',
  'whiskey-sour': '/cocktails/amber-orange-cocktail-glass.png',
  sidecar: '/cocktails/lemon-champagne-bar.png',
  'brandy-alexander': '/cocktails/amber-orange-cocktail-glass.png',
}


function hashSignature(value) {
  return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

function pickCocktailPhoto({ spirit, ingredients, resultCocktail, flavor, signature, appearance }) {
  const ingredientIds = ingredients.map((item) => item.id)

  const ranked = cocktailPhotoLibrary
    .map((candidate) => {
      let score = candidate.scoreBase ?? 0

      if (candidate.spirits?.includes(spirit?.id)) score += 8
      if (candidate.classicIds?.includes(resultCocktail?.id)) score += 18

      if (candidate.ingredientAll?.every((id) => ingredientIds.includes(id))) {
        score += candidate.ingredientAll.length * 7
      }

      if (candidate.ingredientAny) {
        score += candidate.ingredientAny.filter((id) => ingredientIds.includes(id)).length * 4
      }

      if (candidate.id === 'whisky-orange' && flavor.spirit >= 60) score += 4
      if (candidate.id === 'pastel-berry' && flavor.fruity >= 55) score += 5
      if (candidate.id === 'mojito-highball' && flavor.herbal >= 45) score += 5
      if (candidate.id === 'lemon-champagne' && flavor.sour >= 50) score += 4
      if (candidate.id === 'margarita-salt' && flavor.sour >= 55) score += 4
      if (candidate.id === 'amber-orange' && appearance?.family === 'amber') score += 3
      if (candidate.id === 'pastel-berry' && appearance?.family === 'berry') score += 3
      if (candidate.id === 'mule-copper' && appearance?.family === 'spice') score += 3

      return { ...candidate, score }
    })
    .sort((a, b) => b.score - a.score)

  const finalists = ranked.slice(0, Math.min(3, ranked.length))
  const selected = finalists[hashSignature(signature ?? resultCocktail?.id ?? 'x') % finalists.length] ?? ranked[0]

  const themeMap = {
    berry: 'theme-berry',
    sunrise: 'theme-sunrise',
    amber: 'theme-amber',
    citrus: 'theme-citrus',
    herbal: 'theme-herbal',
    spice: 'theme-spice',
    velvet: 'theme-velvet',
    crystal: 'theme-crystal',
    foam: 'theme-foam',
    cola: 'theme-cola',
    gold: 'theme-gold',
  }

  return {
    ...selected,
    themeClass: themeMap[appearance?.family] ?? 'theme-gold',
  }
}

function getClassicPhoto(resultCocktail) {
  return classicPhotoMap[resultCocktail?.id] ?? '/cocktails/amber-orange-cocktail-glass.png'
}


function getColorPoetry(appearance) {
  const map = {
    berry: '像莓果和霓虹灯一起落进杯里。',
    sunrise: '像日出从杯底慢慢往上升。',
    amber: '像黄昏玻璃里的琥珀光。',
    citrus: '像被柑橘皮擦亮的一束金光。',
    herbal: '像青柠和薄荷压出的一层绿雾。',
    spice: '像姜与香料在暖灯下留下的铜色影子。',
    velvet: '像奶油和可可融成的一块旧丝绒。',
    crystal: '像冰雾里透出的一点冷光。',
    foam: '像一层柔软泡沫盖住了酸与酒感。',
    cola: '像深夜木吧台上的可乐棕。',
    gold: '像一杯被灯光温热的蜂蜜金。',
  }

  return map[appearance?.family] ?? '像暖灯下缓缓晃动的一杯金色液体。'
}

function getResultPhotoCandidates({ spirit, ingredients, resultCocktail, flavor, signature, appearance }) {
  const ingredientIds = ingredients.map((item) => item.id)

  const ranked = cocktailPhotoLibrary
    .map((candidate) => {
      let score = candidate.scoreBase ?? 0

      if (candidate.spirits?.includes(spirit?.id)) score += 8
      if (candidate.classicIds?.includes(resultCocktail?.id)) score += 18

      if (candidate.ingredientAll?.every((id) => ingredientIds.includes(id))) {
        score += candidate.ingredientAll.length * 7
      }

      if (candidate.ingredientAny) {
        score += candidate.ingredientAny.filter((id) => ingredientIds.includes(id)).length * 4
      }

      if (candidate.id === 'whisky-orange' && flavor.spirit >= 60) score += 4
      if (candidate.id === 'pastel-berry' && flavor.fruity >= 55) score += 5
      if (candidate.id === 'mojito-highball' && flavor.herbal >= 45) score += 5
      if (candidate.id === 'lemon-champagne' && flavor.sour >= 50) score += 4
      if (candidate.id === 'margarita-salt' && flavor.sour >= 55) score += 4
      if (candidate.id === 'amber-orange' && appearance?.family === 'amber') score += 3
      if (candidate.id === 'pastel-berry' && appearance?.family === 'berry') score += 3
      if (candidate.id === 'mule-copper' && appearance?.family === 'spice') score += 3

      return { ...candidate, score }
    })
    .sort((a, b) => b.score - a.score)

  const finalists = ranked.slice(0, Math.min(4, ranked.length))
  const offset = hashSignature(signature ?? resultCocktail?.id ?? 'x') % finalists.length

  return finalists
    .map((_, index) => finalists[(index + offset) % finalists.length])
    .map((candidate) => ({
      ...candidate,
      themeClass: pickCocktailPhoto({
        spirit,
        ingredients,
        resultCocktail,
        flavor,
        signature: `${signature}-${candidate.id}`,
        appearance,
      }).themeClass,
    }))
}


const amountLevels = [
  { id: 'low', chinese: '少量', english: 'Light' },
  { id: 'standard', chinese: '标准', english: 'Standard' },
  { id: 'high', chinese: '较多', english: 'Rich' },
]

const cocktailTargetAmounts = {
  'dry-martini': { 'dry-vermouth': 'low' },
  negroni: { campari: 'standard', 'sweet-vermouth': 'standard' },
  cosmopolitan: {
    'cranberry-juice': 'standard',
    'triple-sec': 'low',
    'lime-juice': 'low',
  },
  'moscow-mule': { 'ginger-beer': 'high', 'lime-juice': 'low' },
  mojito: {
    'lime-juice': 'standard',
    mint: 'standard',
    'sugar-syrup': 'low',
    'soda-water': 'high',
  },
  daiquiri: { 'lime-juice': 'standard', 'sugar-syrup': 'low' },
  margarita: { 'triple-sec': 'low', 'lime-juice': 'standard' },
  'tequila-sunrise': { 'orange-juice': 'high', grenadine: 'low' },
  'old-fashioned': {
    'sugar-syrup': 'low',
    'aromatic-bitters': 'low',
  },
  'whiskey-sour': {
    'lemon-juice': 'standard',
    'sugar-syrup': 'low',
    'egg-white': 'standard',
  },
  sidecar: { 'triple-sec': 'standard', 'lemon-juice': 'standard' },
  'brandy-alexander': {
    'cacao-liqueur': 'standard',
    cream: 'standard',
  },
}

const ingredientAmountUnits = {
  'lemon-juice': ['15 mL', '25 mL', '35 mL'],
  'lime-juice': ['15 mL', '25 mL', '35 mL'],
  'orange-juice': ['45 mL', '75 mL', '105 mL'],
  'cranberry-juice': ['30 mL', '60 mL', '90 mL'],
  'sugar-syrup': ['10 mL', '15 mL', '20 mL'],
  'honey-syrup': ['10 mL', '15 mL', '20 mL'],
  grenadine: ['10 mL', '15 mL', '20 mL'],
  mint: ['4 片叶', '8 片叶', '12 片叶'],
  'soda-water': ['45 mL', '75 mL', '105 mL'],
  'tonic-water': ['45 mL', '75 mL', '105 mL'],
  cola: ['45 mL', '75 mL', '105 mL'],
  'ginger-beer': ['45 mL', '75 mL', '105 mL'],
  campari: ['15 mL', '30 mL', '45 mL'],
  'triple-sec': ['15 mL', '30 mL', '45 mL'],
  'sweet-vermouth': ['15 mL', '30 mL', '45 mL'],
  'dry-vermouth': ['10 mL', '20 mL', '30 mL'],
  'aromatic-bitters': ['1 dash', '2 dashes', '3 dashes'],
  'egg-white': ['15 mL', '25 mL', '35 mL'],
  cream: ['15 mL', '25 mL', '35 mL'],
  'cacao-liqueur': ['15 mL', '30 mL', '45 mL'],
}

function amountLabel(ingredientId, level = 'standard') {
  const levelIndex = amountLevels.findIndex((item) => item.id === level)
  const values = ingredientAmountUnits[ingredientId] ?? ['15 mL', '30 mL', '45 mL']
  return values[Math.max(0, levelIndex)]
}

function amountLevelName(level) {
  return amountLevels.find((item) => item.id === level)?.chinese ?? '标准'
}


const ingredientFlavor = {
  'lemon-juice': { sweet: 4, sour: 96, bitter: 8, spirit: 0, fruity: 72, herbal: 2 },
  'lime-juice': { sweet: 3, sour: 98, bitter: 12, spirit: 0, fruity: 78, herbal: 4 },
  'orange-juice': { sweet: 58, sour: 34, bitter: 5, spirit: 0, fruity: 96, herbal: 2 },
  'sugar-syrup': { sweet: 100, sour: 0, bitter: 0, spirit: 0, fruity: 0, herbal: 0 },
  'honey-syrup': { sweet: 92, sour: 0, bitter: 2, spirit: 0, fruity: 10, herbal: 12 },
  mint: { sweet: 4, sour: 0, bitter: 8, spirit: 0, fruity: 4, herbal: 100 },
  'soda-water': { sweet: 0, sour: 0, bitter: 0, spirit: 0, fruity: 0, herbal: 0 },
  'tonic-water': { sweet: 32, sour: 6, bitter: 62, spirit: 0, fruity: 10, herbal: 18 },
  cola: { sweet: 78, sour: 8, bitter: 16, spirit: 0, fruity: 8, herbal: 28 },
  campari: { sweet: 48, sour: 2, bitter: 100, spirit: 34, fruity: 42, herbal: 82 },
  'triple-sec': { sweet: 72, sour: 4, bitter: 12, spirit: 36, fruity: 92, herbal: 8 },
  'egg-white': { sweet: 0, sour: 0, bitter: 0, spirit: 0, fruity: 0, herbal: 0 },
  'sweet-vermouth': { sweet: 62, sour: 4, bitter: 24, spirit: 28, fruity: 32, herbal: 86 },
  'dry-vermouth': { sweet: 14, sour: 4, bitter: 18, spirit: 26, fruity: 22, herbal: 72 },
  'aromatic-bitters': { sweet: 8, sour: 0, bitter: 88, spirit: 18, fruity: 18, herbal: 92 },
  'ginger-beer': { sweet: 52, sour: 14, bitter: 8, spirit: 0, fruity: 12, herbal: 48 },
  'cranberry-juice': { sweet: 44, sour: 58, bitter: 12, spirit: 0, fruity: 94, herbal: 2 },
  grenadine: { sweet: 94, sour: 10, bitter: 0, spirit: 0, fruity: 86, herbal: 0 },
  cream: { sweet: 22, sour: 0, bitter: 0, spirit: 0, fruity: 2, herbal: 0 },
  'cacao-liqueur': { sweet: 84, sour: 0, bitter: 26, spirit: 30, fruity: 8, herbal: 4 },
}

const spiritFlavor = {
  gin: { sweet: 4, sour: 0, bitter: 14, spirit: 96, fruity: 18, herbal: 92 },
  vodka: { sweet: 2, sour: 0, bitter: 2, spirit: 96, fruity: 2, herbal: 2 },
  rum: { sweet: 22, sour: 0, bitter: 4, spirit: 92, fruity: 38, herbal: 6 },
  tequila: { sweet: 8, sour: 0, bitter: 10, spirit: 94, fruity: 14, herbal: 42 },
  whisky: { sweet: 12, sour: 0, bitter: 18, spirit: 98, fruity: 20, herbal: 24 },
  brandy: { sweet: 18, sour: 0, bitter: 8, spirit: 94, fruity: 58, herbal: 8 },
}

const flavorAxes = [
  ['sweet', '甜感', 'Sweetness'],
  ['sour', '酸度', 'Acidity'],
  ['bitter', '苦韵', 'Bitterness'],
  ['spirit', '酒感', 'Spirit'],
  ['fruity', '果香', 'Fruity'],
  ['herbal', '草本香料', 'Herbal'],
]

function calculateUserFlavor(
  spirit,
  selectedIngredients,
  ingredientAmounts = {},
) {
  const base = spiritFlavor[spirit?.id] ?? {
    sweet: 0, sour: 0, bitter: 0, spirit: 0, fruity: 0, herbal: 0,
  }
  const levelWeight = { low: 0.65, standard: 1, high: 1.35 }
  const weights = [{ flavor: base, weight: 2.2 }]

  selectedIngredients.forEach((ingredient) => {
    const selectedLevel = ingredientAmounts[ingredient.id] ?? 'standard'
    const baseWeight = ingredient.id === 'aromatic-bitters' ? 0.35 : 1

    weights.push({
      flavor: ingredientFlavor[ingredient.id] ?? {},
      weight: baseWeight * levelWeight[selectedLevel],
    })
  })

  const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0)
  return Object.fromEntries(
    flavorAxes.map(([key]) => [
      key,
      Math.round(
        weights.reduce(
          (sum, item) => sum + (item.flavor[key] ?? 0) * item.weight,
          0,
        ) / totalWeight,
      ),
    ]),
  )
}

function flavorSimilarity(a, b) {
  const averageDifference =
    flavorAxes.reduce((sum, [key]) => sum + Math.abs(a[key] - b[key]), 0) /
    flavorAxes.length
  return Math.max(0, 100 - averageDifference)
}

function scoreCocktail(cocktail, selection) {
  const chosenIds = new Set(selection.ingredients.map((item) => item.id))
  const recipeIds = new Set(cocktail.ingredients)

  const spiritScore = cocktail.spirit === selection.spirit?.id ? 30 : 0

  const coreMatches = cocktail.coreIngredients.filter((id) =>
    chosenIds.has(id),
  ).length
  const coreScore =
    cocktail.coreIngredients.length > 0
      ? (coreMatches / cocktail.coreIngredients.length) * 25
      : 25

  const allMatches = cocktail.ingredients.filter((id) =>
    chosenIds.has(id),
  ).length
  const ingredientCoverage =
    cocktail.ingredients.length > 0
      ? allMatches / cocktail.ingredients.length
      : 1
  const extras = [...chosenIds].filter((id) => !recipeIds.has(id)).length
  const exactIngredientBonus =
    allMatches === cocktail.ingredients.length && extras === 0 ? 5 : 0
  const ingredientScore = Math.max(
    0,
    ingredientCoverage * 15 + exactIngredientBonus - extras * 3,
  )

  const techniqueScore =
    cocktail.technique === selection.technique?.id ? 10 : 0
  const glassScore = cocktail.glasses.includes(selection.glass?.id) ? 5 : 0

  const targetAmounts = cocktailTargetAmounts[cocktail.id] ?? {}
  const amountScores = cocktail.ingredients.map((ingredientId) => {
    if (!chosenIds.has(ingredientId)) return 0

    const target = targetAmounts[ingredientId] ?? 'standard'
    const selected = selection.amounts?.[ingredientId] ?? 'standard'
    const targetIndex = amountLevels.findIndex((item) => item.id === target)
    const selectedIndex = amountLevels.findIndex((item) => item.id === selected)
    const distance = Math.abs(targetIndex - selectedIndex)

    if (distance === 0) return 1
    if (distance === 1) return 0.45
    return 0
  })
  const amountScore =
    amountScores.length > 0
      ? (amountScores.reduce((sum, value) => sum + value, 0) /
          amountScores.length) *
        10
      : 10

  return Math.round(
    Math.min(
      100,
      spiritScore +
        coreScore +
        ingredientScore +
        techniqueScore +
        glassScore +
        amountScore,
    ),
  )
}

function findBestCocktail(selection, userFlavor) {
  return cocktails
    .map((cocktail) => ({
      ...cocktail,
      score: scoreCocktail(cocktail, selection),
    }))
    .sort((a, b) => b.score - a.score)[0]
}

function buildMatchReasons(result, selection) {
  const chosenIds = new Set(selection.ingredients.map((item) => item.id))
  const matched = result.ingredients.filter((id) => chosenIds.has(id))
  const missing = result.ingredients.filter((id) => !chosenIds.has(id))
  const extras = selection.ingredients
    .map((item) => item.id)
    .filter((id) => !result.ingredients.includes(id))

  return { matched, missing, extras }
}

function ingredientName(id) {
  return ingredients.find((item) => item.id === id)?.chinese ?? id
}

function spiritName(id) {
  return spirits.find((item) => item.id === id)?.chinese ?? id
}

function techniqueName(id) {
  return techniques.find((item) => item.id === id)?.chinese ?? id
}

function glassName(id) {
  return glasses.find((item) => item.id === id)?.chinese ?? id
}

function buildPerfectAdvice(result, selection) {
  const reasons = buildMatchReasons(result, selection)
  const advice = []

  if (result.spirit !== selection.spirit?.id) {
    advice.push({
      type: 'replace',
      title: `把基酒改为${spiritName(result.spirit)}`,
      detail: `经典${result.chinese}以${spiritName(result.spirit)}为主体，这一项对相似度影响最大。`,
    })
  }

  reasons.missing.forEach((id) => {
    advice.push({
      type: 'add',
      title: `加入${ingredientName(id)}`,
      detail: result.coreIngredients.includes(id)
        ? `这是经典配方的核心材料，补齐后会明显提升结构还原度。`
        : `补上这一味，可以让配方更完整。`,
    })
  })

  reasons.extras.forEach((id) => {
    advice.push({
      type: 'remove',
      title: `去掉${ingredientName(id)}`,
      detail: `它属于你的创意变化，但会让成品偏离经典${result.chinese}。`,
    })
  })

  const targetAmounts = cocktailTargetAmounts[result.id] ?? {}

  result.ingredients.forEach((ingredientId) => {
    if (!selection.ingredients.some((item) => item.id === ingredientId)) return

    const targetLevel = targetAmounts[ingredientId] ?? 'standard'
    const selectedLevel = selection.amounts?.[ingredientId] ?? 'standard'

    if (targetLevel !== selectedLevel) {
      advice.push({
        type: 'amount',
        title: `把${ingredientName(ingredientId)}调为${amountLevelName(targetLevel)}`,
        detail: `当前为${amountLevelName(selectedLevel)}（${amountLabel(
          ingredientId,
          selectedLevel,
        )}），经典比例建议为${amountLevelName(targetLevel)}（${amountLabel(
          ingredientId,
          targetLevel,
        )}）。`,
      })
    }
  })

  if (result.technique !== selection.technique?.id) {
    advice.push({
      type: 'technique',
      title: `工艺改为${techniqueName(result.technique)}`,
      detail: `经典版本通常采用${techniqueName(result.technique)}，会改变稀释度、透明度与口感。`,
    })
  }

  if (!result.glasses.includes(selection.glass?.id)) {
    advice.push({
      type: 'glass',
      title: `杯型改为${result.glasses.map(glassName).join('或')}`,
      detail: `正确杯型能让香气、温度和饮用体验更接近经典呈现。`,
    })
  }

  return advice
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function dominantFlavor(flavor) {
  return flavorAxes
    .map(([key, label]) => ({ key, label, value: flavor[key] ?? 0 }))
    .sort((a, b) => b.value - a.value)[0]
}

function getTechniqueFit(selection) {
  const ids = selection.ingredients.map((item) => item.id)
  const hasJuice = ids.some((id) =>
    ['lemon-juice', 'lime-juice', 'orange-juice', 'cranberry-juice'].includes(id),
  )
  const hasTexture = ids.some((id) => ['egg-white', 'cream'].includes(id))
  const hasBubbles = ids.some((id) =>
    ['soda-water', 'tonic-water', 'cola', 'ginger-beer'].includes(id),
  )

  if (selection.technique?.id === 'shake' && (hasJuice || hasTexture)) return 1
  if (selection.technique?.id === 'build' && hasBubbles) return 1
  if (
    selection.technique?.id === 'stir' &&
    !hasJuice &&
    !hasTexture &&
    !hasBubbles
  ) return 1

  return 0.72
}

function getCreativeTitle(selection, flavor) {
  const dominant = dominantFlavor(flavor).key
  const titleMap = {
    whisky: {
      sweet: '琥珀旧梦',
      sour: '荒原闪电',
      bitter: '黑松镇来客',
      spirit: '西部落日',
      fruity: '黄昏果园',
      herbal: '马刺与野草',
    },
    gin: {
      sweet: '月光温室',
      sour: '杜松晨雾',
      bitter: '午夜植物志',
      spirit: '银色俱乐部',
      fruity: '花园电报',
      herbal: '雾中植物园',
    },
    rum: {
      sweet: '热岛蜜语',
      sour: '海风航线',
      bitter: '旧港日蚀',
      spirit: '甘蔗船长',
      fruity: '珊瑚晚霞',
      herbal: '加勒比绿洲',
    },
    vodka: {
      sweet: '霓虹糖霜',
      sour: '冰原来信',
      bitter: '午夜电台',
      spirit: '白夜列车',
      fruity: '玻璃城市',
      herbal: '冷雾花房',
    },
    tequila: {
      sweet: '沙漠蜜光',
      sour: '边境闪电',
      bitter: '仙人掌月蚀',
      spirit: '龙舌兰公路',
      fruity: '赤色日出',
      herbal: '边境月光',
    },
    brandy: {
      sweet: '丝绒旧梦',
      sour: '庄园雨信',
      bitter: '铜色夜曲',
      spirit: '旧时代舞会',
      fruity: '葡萄园黄昏',
      herbal: '壁炉边的密语',
    },
  }

  return titleMap[selection.spirit?.id]?.[dominant] ?? '无名夜航'
}

function getSceneProfile(selection, flavor) {
  const dominant = dominantFlavor(flavor).key
  const spiritId = selection.spirit?.id

  const spiritScenes = {
    whisky: {
      scene: '西部荒原的黄昏酒馆',
      objects: ['皮靴', '旧木吧台', '落日', '远处的口琴'],
      style: '粗粝而温柔',
    },
    gin: {
      scene: '雨夜里亮着黄铜灯的植物酒吧',
      objects: ['杜松', '玻璃温室', '雨声', '银色月光'],
      style: '克制而神秘',
    },
    rum: {
      scene: '海港停泊后的热带夜晚',
      objects: ['海风', '旧船票', '棕榈影', '晚霞'],
      style: '松弛而浪漫',
    },
    vodka: {
      scene: '凌晨两点的霓虹天台',
      objects: ['冰雾', '城市灯牌', '玻璃幕墙', '午夜电台'],
      style: '清冷而现代',
    },
    tequila: {
      scene: '边境公路旁的沙漠落日',
      objects: ['仙人掌', '尘土', '机车', '赤红天空'],
      style: '炽烈而自由',
    },
    brandy: {
      scene: '老欧洲旅馆的壁炉客厅',
      objects: ['丝绒', '铜灯', '旧唱片', '葡萄园'],
      style: '温暖而复古',
    },
  }

  const profile = spiritScenes[spiritId] ?? {
    scene: '夜色深处的一间私人酒吧',
    objects: ['暖灯', '玻璃杯', '旧唱片', '窗外夜色'],
    style: '安静而有故事',
  }

  const dominantScenes = {
    sweet: '它像灯光下慢慢融化的一句情话',
    sour: '它像一道穿过夜色的亮光，干净、敏捷',
    bitter: '它把成熟的苦韵藏在尾声里，越喝越有故事',
    spirit: '它保留了烈酒的骨架，像一个说话不多却很坚定的人',
    fruity: '果香让整杯酒显得鲜活，像刚拆开的夏日明信片',
    herbal: '草本与香料在杯中铺开，像潮湿夜色里的秘密花园',
  }

  return {
    ...profile,
    dominantSentence: dominantScenes[dominant],
  }
}

function getFlavorSummary(flavor) {
  const sorted = flavorAxes
    .map(([key, label]) => ({ key, label, value: flavor[key] ?? 0 }))
    .sort((a, b) => b.value - a.value)

  const first = sorted[0]
  const second = sorted[1]

  return `${first.label}主导，${second.label}随后展开`
}


function buildCreativeReview(selection, flavor, classicReference) {
  const ingredientCount = selection.ingredients.length
  const values = flavorAxes.map(([key]) => flavor[key] ?? 0)
  const spread = Math.max(...values) - Math.min(...values)
  const techniqueFit = getTechniqueFit(selection)
  const ingredientIds = selection.ingredients.map((item) => item.id)

  const hasBubbles = ingredientIds.some((id) =>
    ['soda-water', 'tonic-water', 'cola', 'ginger-beer'].includes(id),
  )
  const hasCitrus = ingredientIds.some((id) =>
    ['lemon-juice', 'lime-juice', 'orange-juice', 'cranberry-juice'].includes(id),
  )
  const hasTexture = ingredientIds.some((id) => ['egg-white', 'cream'].includes(id))
  const hasHerbal = ingredientIds.some((id) => ['mint', 'basil', 'rosemary'].includes(id))
  const hasSweetener = ingredientIds.some((id) =>
    ['simple-syrup', 'honey', 'cola', 'cream'].includes(id),
  )

  const balanceScore = Math.max(
    8,
    Math.min(28, Math.round(28 - Math.max(0, spread - 34) * 0.28)),
  )
  const structureScore = Math.max(
    8,
    Math.min(22, Math.round(10 + techniqueFit * 12)),
  )
  const layeringScore = Math.max(8, Math.min(18, 8 + ingredientCount * 2))
  const expressionScore = Math.max(
    8,
    Math.min(16, 8 + new Set(selection.ingredients.map((item) => item.category)).size),
  )

  let finishScore = 8
  if (hasBubbles) finishScore += 2
  if (hasCitrus) finishScore += 2
  if (hasTexture) finishScore += 2
  if (hasHerbal) finishScore += 1
  if (flavor.spirit >= 70 && !hasSweetener && !hasCitrus) finishScore -= 3
  finishScore = Math.max(6, Math.min(16, finishScore))

  const score = Math.max(
    52,
    Math.min(
      96,
      balanceScore + structureScore + layeringScore + expressionScore + finishScore,
    ),
  )

  const title = getCreativeTitle(selection, flavor)
  const dominant = dominantFlavor(flavor)

  let opening = '入口先碰到的是基酒本身，味道来得比较直接。'
  if (flavor.sour >= 46) {
    opening = '入口先是一点轻快的酸意，像冰杯边缘掠过的一道亮光。'
  } else if (flavor.sweet >= 48) {
    opening = '入口偏圆润，甜感先落下来，喝起来比较顺。'
  } else if (flavor.spirit >= 62) {
    opening = '入口酒感更突出，第一秒就能感到基酒的力量。'
  }

  let middle = '中段的味道慢慢铺开，节奏不急，层次也比较清楚。'
  if (flavor.fruity >= 38 && flavor.herbal >= 32) {
    middle = '中段能感觉到果香和草本气息一起往上走，闻起来和喝起来都更立体。'
  } else if (flavor.fruity >= 42) {
    middle = '中段果香会更明显一些，让整杯酒显得更鲜活。'
  } else if (flavor.herbal >= 36) {
    middle = '中段的草本和香料感慢慢出来，气味会比入口更迷人。'
  } else if (hasTexture) {
    middle = '中段的口感会更柔和一点，酒液在嘴里显得更顺滑。'
  } else if (hasBubbles) {
    middle = '气泡把味道托了起来，所以中段不会闷，反而更轻盈。'
  }

  let finish = '尾韵收得比较干净，杯子放下之后嘴里还会留一点余味。'
  if (flavor.bitter >= 34) {
    finish = '尾韵会留一点克制的苦感，所以收口更成熟，也更耐喝。'
  } else if (flavor.herbal >= 38) {
    finish = '尾韵会挂一点植物香气，收口很安静，但记忆点很清楚。'
  } else if (flavor.fruity >= 45) {
    finish = '尾韵偏清爽，果香收得干净，喝完不会觉得拖沓。'
  } else if (flavor.spirit >= 66) {
    finish = '尾韵的酒感会再抬一下，所以整杯酒的存在感比较强。'
  }

  let mood = '适合坐在灯光偏暗的吧台前，慢一点喝。'
  if (selection.spirit?.id === 'whisky') {
    mood = '更像适合夜里坐在木质吧台边，慢慢喝，慢慢回味。'
  } else if (selection.spirit?.id === 'gin') {
    mood = '会让人想到雨夜、植物香气，还有偏冷一点的灯光。'
  } else if (selection.spirit?.id === 'rum') {
    mood = '更适合热一点的夜晚，像海风、晚霞和带点黏度的空气。'
  } else if (selection.spirit?.id === 'vodka') {
    mood = '很像城市深夜的味道，干净、冷一点，也更利落。'
  } else if (selection.spirit?.id === 'tequila') {
    mood = '有点像傍晚还带着热气的公路，整杯酒更外放，也更直接。'
  } else if (selection.spirit?.id === 'brandy') {
    mood = '比较像一间有暖灯和旧唱片的房间，气氛会更柔和。'
  }

  const briefNote =
    score >= 90
      ? '完成度高，喝感很顺。'
      : score >= 80
        ? '思路清楚，风格鲜明。'
        : score >= 68
          ? '个性很强，但有些味道会更抢。'
          : '冲击感明显，喜好会比较看个人口味。'

  const classicLine = classicReference
    ? `${classicReference.chinese}的影子会比较明显。`
    : '它更像一杯完全按当下口味长出来的酒。'

  const praise = `${opening}${middle}${finish}${mood}`
  const shortIntro = `${briefNote}${classicLine}`

  const tags = Array.from(
    new Set([
      dominant.label,
      flavor.sweet >= 45 ? '偏甜' : null,
      flavor.sour >= 42 ? '清爽' : null,
      flavor.bitter >= 30 ? '微苦' : null,
      flavor.herbal >= 34 ? '草本' : null,
      flavor.fruity >= 36 ? '果香' : null,
      flavor.spirit >= 62 ? '酒感明显' : '顺口',
    ].filter(Boolean)),
  ).slice(0, 5)

  const scoreLabel =
    score >= 92
      ? '很完整'
      : score >= 84
        ? '很有风格'
        : score >= 72
          ? '有明显个性'
          : '很大胆'

  return {
    title,
    score,
    scoreLabel,
    shortIntro,
    praise,
    tags,
    scene: mood,
    flavorSummary: getFlavorSummary(flavor),
    dimensions: {
      balance: balanceScore,
      layering: layeringScore,
      completion: structureScore,
      creativity: expressionScore,
      atmosphere: finishScore,
    },
    signature: [
      selection.spirit?.id,
      ...selection.ingredients
        .map((item) => `${item.id}:${selection.amounts?.[item.id] ?? 'standard'}`)
        .sort(),
      selection.technique?.id,
      selection.glass?.id,
    ].join('|'),
  }
}




const flavorChineseMap = {
  sweet: '甜感',
  sour: '酸度',
  bitter: '苦韵',
  spirit: '酒感',
  fruity: '果香',
  herbal: '草本香料',
}

const flavorShortMap = {
  sweet: '甜润',
  sour: '明亮酸度',
  bitter: '苦韵',
  spirit: '酒体',
  fruity: '果香',
  herbal: '草本',
}

function stableTextIndex(seed, length, salt = '') {
  const value = `${seed ?? ''}:${salt}`
    .split('')
    .reduce((sum, character, index) => {
      return (sum * 31 + character.charCodeAt(0) + index) >>> 0
    }, 7)

  return length > 0 ? value % length : 0
}

function chooseStableText(options, seed, salt) {
  if (!options.length) return ''
  return options[stableTextIndex(seed, options.length, salt)]
}

function getFlavorLevel(value) {
  if (value >= 70) return 'veryHigh'
  if (value >= 52) return 'high'
  if (value >= 34) return 'medium'
  if (value >= 18) return 'low'
  return 'veryLow'
}

function getSortedFlavorAxes(flavor) {
  return flavorAxes
    .map(([key, label]) => ({
      key,
      label,
      value: flavor?.[key] ?? 0,
      level: getFlavorLevel(flavor?.[key] ?? 0),
    }))
    .sort((a, b) => b.value - a.value)
}

function buildFlavorTags(flavor, ingredients) {
  const axes = getSortedFlavorAxes(flavor)
  const ids = ingredients.map((item) => item.id)
  const tags = []

  axes.slice(0, 3).forEach((axis) => {
    const tagMap = {
      sweet: axis.value >= 52 ? '甜润突出' : '甜感克制',
      sour: axis.value >= 52 ? '酸度明亮' : '酸感轻柔',
      bitter: axis.value >= 52 ? '苦韵鲜明' : '轻微苦韵',
      spirit: axis.value >= 52 ? '酒感清晰' : '酒体轻盈',
      fruity: axis.value >= 52 ? '果香饱满' : '淡雅果香',
      herbal: axis.value >= 52 ? '草本主导' : '草本点缀',
    }
    tags.push(tagMap[axis.key])
  })

  if (ids.includes('cola')) tags.push('深色气泡')
  if (ids.includes('egg-white')) tags.push('绵密泡沫')
  if (ids.includes('cream')) tags.push('奶油质地')
  if (ids.includes('mint')) tags.push('清凉薄荷')
  if (ids.includes('ginger-beer')) tags.push('辛香气泡')
  if (ids.includes('grenadine')) tags.push('红果渐层')
  if (ids.includes('tonic-water')) tags.push('清苦气泡')
  if (ids.includes('soda-water')) tags.push('轻盈长饮')

  return [...new Set(tags)].slice(0, 5)
}

function buildAxisSentence(axis, position, seed) {
  const phraseBank = {
    sweet: {
      veryHigh: [
        '甜味占据明显主导，入口圆润，风味更偏甜点型。',
        '甜感饱满而直接，会让其他细节显得更柔和。',
        '糖感存在感很强，酒体显得厚实、亲和，但也更容易产生腻感。',
      ],
      high: [
        '甜感较为明显，给酒体增加了圆润度和包裹感。',
        '甜味承担了主要的衔接作用，让入口更顺滑。',
        '甜度偏高，但还没有完全盖住其他风味。',
      ],
      medium: [
        '甜感处于中间位置，主要负责连接酸、苦与酒感。',
        '甜味存在但不抢戏，整体更容易保持平衡。',
        '甜度适中，入口有柔和感，同时保留一定轮廓。',
      ],
      low: [
        '甜感较低，整体风格更干爽、利落。',
        '糖感被控制得比较克制，其他风味会显得更清楚。',
        '甜味只起到轻微修饰作用，酒体偏干。',
      ],
      veryLow: [
        '几乎没有明显甜感，风格非常干。',
        '甜味支撑很弱，酸、苦或酒感会更容易被放大。',
        '缺少甜味缓冲，整体线条会显得偏锐利。',
      ],
    },
    sour: {
      veryHigh: [
        '酸度非常突出，入口会迅速收紧口腔，清爽但攻击性较强。',
        '酸感成为最先被感知的部分，明亮、有张力，也容易显尖。',
        '高酸让酒体非常活跃，适合追求清冽感，但需要留意失衡。',
      ],
      high: [
        '酸度明亮，能有效拉开甜味并提升新鲜感。',
        '酸感清楚，入口有明显提神效果。',
        '酸度偏高，为整杯酒提供了清晰骨架。',
      ],
      medium: [
        '酸度适中，主要负责提亮果香和整理收口。',
        '酸感有存在感，但不会压过其他风味。',
        '适中的酸度让酒体保持轻快，又不至于过于锐利。',
      ],
      low: [
        '酸度偏低，整体会显得更柔和、圆润。',
        '酸感只做轻微提亮，酒体不会特别紧致。',
        '缺少明显酸度，甜味或酒感会更容易停留。',
      ],
      veryLow: [
        '几乎没有酸度支撑，整体可能偏平或偏厚。',
        '酸感非常弱，风味少了提亮和收紧的力量。',
        '缺少酸度后，甜味与厚重感更容易堆积。',
      ],
    },
    bitter: {
      veryHigh: [
        '苦韵非常明显，会从中段持续到收尾，风格成熟而强硬。',
        '高苦度让整杯酒拥有强烈成人感，但耐受度要求较高。',
        '苦味成为主轴，余味长而干，适合偏好复杂苦香的人。',
      ],
      high: [
        '苦韵清楚，为甜味和果香增加了成熟感。',
        '苦味偏高，能形成有力收口，也会提高辨识度。',
        '中后段的苦感较明显，让风格显得更克制。',
      ],
      medium: [
        '苦韵适中，主要负责增加层次和延长尾韵。',
        '苦味不重，但能让酒体不至于过甜或过于单薄。',
        '适度苦感给整杯酒增加了一点成熟轮廓。',
      ],
      low: [
        '苦韵较轻，整体更容易入口。',
        '苦味只是背景修饰，不会明显影响饮用门槛。',
        '收尾里的苦感很克制，风格偏柔和。',
      ],
      veryLow: [
        '几乎没有苦味，整体会更直白、亲和。',
        '苦韵缺席，尾段少了一点收束和复杂度。',
        '缺少苦味支撑，风格更偏果汁感或甜饮感。',
      ],
    },
    spirit: {
      veryHigh: [
        '酒感非常强，基酒存在感贯穿始终，入口与尾韵都有明显热度。',
        '高酒精感让结构非常硬朗，风味会围绕基酒展开。',
        '烈酒感占据主导，适合慢饮，但对平衡要求更高。',
      ],
      high: [
        '酒感清楚，基酒的个性没有被辅料遮住。',
        '酒体偏强，入口有力度，收尾也比较干净。',
        '基酒存在感较高，让整杯酒拥有明确骨架。',
      ],
      medium: [
        '酒感适中，既能感受到基酒，又不会显得过冲。',
        '酒体强度处于舒适区间，辅料和基酒能彼此看见。',
        '酒感有支撑但不压人，整体比较均衡。',
      ],
      low: [
        '酒感偏轻，整体更接近轻松长饮。',
        '基酒被辅料柔化，入口门槛较低。',
        '烈酒存在感不强，风格更轻盈、更容易连续饮用。',
      ],
      veryLow: [
        '酒感非常弱，整体更像风味饮料。',
        '基酒轮廓不明显，辅料几乎占据全部注意力。',
        '缺少酒体支撑，可能显得轻薄或缺少尾韵。',
      ],
    },
    fruity: {
      veryHigh: [
        '果香非常饱满，成为最直观的第一印象。',
        '果味占据中心位置，香气外放，风格鲜明而讨喜。',
        '高果香让整杯酒充满新鲜感，但也可能掩盖基酒细节。',
      ],
      high: [
        '果香明显，入口和鼻后香都有较强存在感。',
        '果味偏突出，让整杯酒更亲和、更容易理解。',
        '果香为酒体带来鲜活感，并能柔化部分酒精刺激。',
      ],
      medium: [
        '果香适中，负责提亮整体，但不会完全主导。',
        '果味与基酒保持平衡，香气有层次而不夸张。',
        '果香处于舒适位置，既有新鲜感，也保留其他细节。',
      ],
      low: [
        '果香较轻，整体更强调基酒、草本或苦韵。',
        '果味只做背景点缀，风格偏克制。',
        '果香不强，酒体会显得更干、更成熟。',
      ],
      veryLow: [
        '几乎没有果香，整体风格偏冷峻、干燥。',
        '果味支撑很弱，其他轴向会显得更加突出。',
        '缺少果香后，酒体更强调烈酒、草本或苦感。',
      ],
    },
    herbal: {
      veryHigh: [
        '草本与香料感非常突出，香气复杂，风格偏冷峻。',
        '高草本度让整杯酒具有鲜明植物气息和强烈辨识度。',
        '草本香料成为主轴，入口清凉或辛香，尾韵偏干。',
      ],
      high: [
        '草本香料感清楚，能够明显提升复杂度。',
        '植物气息偏强，让酒体更有个性和层次。',
        '草本风味较突出，整体显得干练而成熟。',
      ],
      medium: [
        '草本感适中，为酒体增加香气层次，但不会喧宾夺主。',
        '植物香气在中段出现，承担连接基酒和尾韵的作用。',
        '适度草本让整杯酒更耐闻，也增加了一点复杂度。',
      ],
      low: [
        '草本感较轻，主要作为背景修饰。',
        '植物气息不强，整体更强调果香、酸甜或基酒。',
        '草本只留下轻微轮廓，风格相对直白。',
      ],
      veryLow: [
        '几乎没有草本香料感，香气结构比较简单直接。',
        '植物气息缺席，整杯酒更偏果味或基础酸甜。',
        '草本维度很低，复杂度更多需要由其他风味提供。',
      ],
    },
  }

  const levelOptions = phraseBank[axis.key]?.[axis.level] ?? []
  return chooseStableText(levelOptions, seed, `${axis.key}-${position}`)
}

function buildPairInterpretation(first, second, seed) {
  const key = [first.key, second.key].sort().join('-')
  const pairBank = {
    'fruity-sweet': [
      '果香与甜感共同构成圆润、讨喜的主体，整体更接近轻松易饮型。',
      '甜味托住果香，使香气更饱满，但需要酸度防止口感发腻。',
      '果甜组合让第一印象非常友好，适合偏好柔和风格的人。',
    ],
    'sour-sweet': [
      '酸甜形成直接对比，决定这杯酒是清爽还是偏甜的关键。',
      '酸与甜互相拉扯，平衡得好会非常活泼，失衡时则容易显尖或显腻。',
      '这是一杯以酸甜结构为核心的酒，入口节奏会比较清楚。',
    ],
    'herbal-spirit': [
      '草本与酒感叠加后，基酒轮廓会更硬朗，整体偏干、偏成熟。',
      '植物香气包裹烈酒感，形成冷峻、清晰、辨识度高的风格。',
      '草本和酒体共同主导，适合慢饮，香气会比甜味更重要。',
    ],
    'bitter-spirit': [
      '苦韵与酒感共同增强成熟度，收尾会偏干、偏长。',
      '烈酒和苦味形成硬朗骨架，饮用门槛较高，但个性清楚。',
      '苦味放大了基酒的力量，整体更像餐后慢饮型鸡尾酒。',
    ],
    'bitter-herbal': [
      '苦韵与草本叠加，香气复杂，尾段偏干，成人感明显。',
      '植物香料与苦味共同延长余韵，风格克制而有辨识度。',
      '这是偏草本苦香的组合，香气比甜度更值得关注。',
    ],
    'fruity-sour': [
      '果香被酸度提亮，整体会显得新鲜、轻快、有活力。',
      '果味和酸感共同构成明亮主体，适合做成清爽型长饮。',
      '酸度让果香更加立体，入口会比单纯果甜组合更利落。',
    ],
    'sour-spirit': [
      '酸度把酒感切得更清楚，入口有力度，收口也更利落。',
      '高酸与烈酒形成锐利结构，清爽但可能略显尖锐。',
      '酸感负责提亮，酒感负责骨架，整体轮廓非常直接。',
    ],
    'herbal-sour': [
      '酸度提亮草本香气，带来清凉、干爽的植物感。',
      '草本与酸感结合后，整体偏清冽，香气有明显上扬感。',
      '植物气息被酸度拉开，适合追求清新、低甜风格。',
    ],
    'bitter-sweet': [
      '甜味包裹苦韵，形成先柔后苦的层次。',
      '苦甜平衡决定了整杯酒是成熟顺口，还是厚重黏腻。',
      '甜感让苦味更容易入口，苦韵则负责避免口感单调。',
    ],
    'fruity-spirit': [
      '果香柔化酒感，但基酒仍提供明确支撑。',
      '果味和烈酒并存，既有亲和力，也保留一定力量。',
      '基酒骨架托住果香，整体会比纯果汁型鸡尾酒更完整。',
    ],
    'fruity-herbal': [
      '果香与草本形成清新对比，香气层次丰富。',
      '植物气息让果味不至于过甜，整体更有自然感。',
      '果香负责亲和，草本负责个性，两者形成鲜明对照。',
    ],
  }

  return chooseStableText(
    pairBank[key] ?? [
      `${flavorChineseMap[first.key]}与${flavorChineseMap[second.key]}共同构成这杯酒的主要轮廓。`,
      `整杯酒主要围绕${flavorChineseMap[first.key]}和${flavorChineseMap[second.key]}展开。`,
      `${flavorChineseMap[first.key]}提供第一印象，${flavorChineseMap[second.key]}负责支撑后续层次。`,
    ],
    seed,
    `pair-${key}`,
  )
}

function getIngredientContribution(ingredient, amountLevel, seed) {
  const amountText =
    amountLevel === 'high' ? '用量偏高' : amountLevel === 'low' ? '用量克制' : '标准用量'

  const ingredientBank = {
    'lemon-juice': [
      '柠檬汁提供清晰酸度和明亮香气，使收口更利落。',
      '柠檬汁会抬高新鲜感，并削弱甜味的黏滞感。',
      '柠檬酸香负责打开入口，让酒体显得更轻快。',
    ],
    'lime-juice': [
      '青柠汁带来更锋利的酸度和轻微青绿香气。',
      '青柠的酸感比柠檬更紧致，会让酒体显得更干爽。',
      '青柠汁在入口形成明亮切口，同时强化热带气息。',
    ],
    'orange-juice': [
      '橙汁增加果肉感、甜香和自然浑浊度。',
      '橙汁让酒体更圆润，并带来温暖柑橘香。',
      '橙汁提供柔和果甜，使烈酒感更容易入口。',
    ],
    'cranberry-juice': [
      '蔓越莓汁带来红果酸香，让颜色和果味都更鲜明。',
      '蔓越莓的酸甜感会增加清爽度，同时留下轻微涩感。',
      '莓果香气提升亲和力，也让酒体更偏现代果味风格。',
    ],
    grenadine: [
      '红石榴糖浆增加甜度、红果香和视觉渐层。',
      '石榴糖浆会明显圆润口感，用量过高时容易压住基酒。',
      '红石榴糖浆提供浓缩果甜，使尾韵更厚。',
    ],
    mint: [
      '薄荷带来清凉草本香，主要作用在鼻后香和收尾。',
      '薄荷让香气更上扬，也能降低甜饮的厚重感。',
      '薄荷提供鲜明清凉感，使整体更像夏季长饮。',
    ],
    cola: [
      '可乐带来深色焦糖、香料和气泡，同时明显增加甜度。',
      '可乐会柔化烈酒刺激，并留下焦糖与香料尾韵。',
      '可乐提供甜苦交织的深色气泡结构，基酒会更易入口。',
    ],
    'soda-water': [
      '苏打水稀释酒体并增加气泡，使香气更轻盈。',
      '苏打水拉长饮用长度，同时降低甜度和酒精刺激。',
      '气泡水负责打开香气，让整体更清爽、更适合连续饮用。',
    ],
    'tonic-water': [
      '汤力水增加气泡和奎宁苦感，收尾更干。',
      '汤力水会强化清苦感，并突出金酒或草本基酒的植物香。',
      '细密气泡和轻苦尾韵让酒体显得更成熟。',
    ],
    'ginger-beer': [
      '姜汁啤酒带来辛香、甜感和强烈气泡。',
      '姜味会在中后段形成温热刺激，与酸味形成鲜明对比。',
      '姜汁气泡增加活力，同时让收尾带有辛辣感。',
    ],
    'egg-white': [
      '蛋清带来细腻泡沫和丝滑触感，但不会明显增加味道。',
      '蛋清会软化酸度与酒精刺激，使口感更绵密。',
      '泡沫层让香气释放更缓慢，整体更像经典酸酒。',
    ],
    cream: [
      '奶油增加厚度和不透明质地，使口感更像甜点。',
      '奶油会显著降低刺激感，同时放大甜润和饱满感。',
      '乳脂质地让酒体更顺滑，但也容易遮盖清新香气。',
    ],
    'cacao-liqueur': [
      '可可利口酒带来巧克力、烘焙和甜点气息。',
      '可可风味增加厚重度，并让尾韵更温暖。',
      '巧克力香会主导中后段，适合与奶油或白兰地搭配。',
    ],
    campari: [
      '金巴利提供柑橘苦香和红色草本气息。',
      '金巴利让苦韵更清楚，也延长了尾段复杂度。',
      '红色苦味酒增加成熟感，并能平衡较高甜度。',
    ],
    'triple-sec': [
      '橙味利口酒增加橙皮甜香，并连接酸味与基酒。',
      '橙味利口酒让柑橘香更完整，同时略微增加甜度。',
      '橙皮香气会在中段出现，使酸酒结构更圆润。',
    ],
    'sweet-vermouth': [
      '甜味美思带来香草、香料和葡萄酒甜润感。',
      '甜味美思增加草本复杂度，并柔化烈酒边缘。',
      '香料葡萄酒风味让中段更厚，尾韵更长。',
    ],
    'dry-vermouth': [
      '干味美思增加干燥草本、白花和淡酒香。',
      '干味美思会拉长金酒或伏特加的线条，使风格更冷冽。',
      '干型强化酒体的清晰度，同时降低甜感。',
    ],
    'aromatic-bitters': [
      '苦精用量虽少，但能显著增加香料感和尾韵。',
      '苦精负责把甜味、果香和基酒连接起来。',
      '香料苦精让收尾更完整，也增加了成熟度。',
    ],
    'sugar-syrup': [
      '糖浆直接增加甜度和圆润感，并缓冲酸味。',
      '糖浆让口感更顺，但过量时会降低清晰度。',
      '糖浆承担平衡酸度的作用，使入口更柔和。',
    ],
    'honey-syrup': [
      '蜂蜜糖浆增加花香、黏度和温暖甜感。',
      '蜂蜜比普通糖浆更有香气，会让酒体显得更厚。',
      '蜂蜜甜感能柔化烈酒，同时留下较长余韵。',
    ],
  }

  const base = chooseStableText(
    ingredientBank[ingredient.id] ?? [
      `${ingredient.chinese}为这杯酒增加了自己的主要风味。`,
      `${ingredient.chinese}参与构成了中段层次和整体风格。`,
      `${ingredient.chinese}改变了酒体的香气、甜酸或质地表现。`,
    ],
    seed,
    `ingredient-${ingredient.id}`,
  )

  return {
    name: ingredient.chinese,
    amountText,
    text: base,
  }
}

function buildBalanceDiagnosis(flavor, seed) {
  const sweet = flavor.sweet ?? 0
  const sour = flavor.sour ?? 0
  const bitter = flavor.bitter ?? 0
  const spirit = flavor.spirit ?? 0
  const fruity = flavor.fruity ?? 0
  const herbal = flavor.herbal ?? 0
  const spread = Math.max(sweet, sour, bitter, spirit, fruity, herbal) -
    Math.min(sweet, sour, bitter, spirit, fruity, herbal)

  if (spread <= 18) {
    return chooseStableText([
      '六个维度分布接近，整体属于均衡型，几乎没有单一风味完全压过其他部分。',
      '雷达图较为收拢，说明各风味彼此制约，结构稳定、饮用门槛较低。',
      '风味分布相对平均，优势是完整，代价是个性可能不够尖锐。',
    ], seed, 'balance-even')
  }

  if (sweet - sour >= 28) {
    return chooseStableText([
      '甜度明显高于酸度，口感会偏圆润，但需要留意后段发腻。',
      '甜感缺少足够酸度牵制，整体可能显得厚、软、收口偏慢。',
      '当前结构偏甜，酸度不足以完全拉开酒体。',
    ], seed, 'balance-sweet')
  }

  if (sour - sweet >= 28) {
    return chooseStableText([
      '酸度明显高于甜度，入口会偏尖锐，清爽感强但缓冲不足。',
      '酸感缺少甜味包裹，酒体会显得紧、直、刺激感较明显。',
      '当前结构偏酸，优点是利落，缺点是圆润度不足。',
    ], seed, 'balance-sour')
  }

  if (spirit >= 55 && sweet <= 25 && sour <= 25) {
    return chooseStableText([
      '酒感缺少酸甜缓冲，基酒力量会被直接感知，适合慢饮。',
      '这是明显的烈酒主导结构，轮廓清楚，但入口门槛较高。',
      '酒体强而修饰少，风格硬朗，适合偏好纯粹基酒感的人。',
    ], seed, 'balance-spirit')
  }

  if (herbal >= 55 && fruity <= 25) {
    return chooseStableText([
      '草本香料远高于果香，整体偏干、偏冷峻，复杂度高于亲和力。',
      '植物气息主导，果香缓冲不足，风格会显得成熟而克制。',
      '香气重心明显落在草本一侧，辨识度高，但不是甜美路线。',
    ], seed, 'balance-herbal')
  }

  if (bitter >= 45 && sweet <= 25) {
    return chooseStableText([
      '苦韵缺少甜味缓冲，尾段会偏干、偏硬。',
      '苦味结构清楚，但甜度不足时容易显得锋利。',
      '当前苦感较突出，适合偏好成熟苦香的人。',
    ], seed, 'balance-bitter')
  }

  return chooseStableText([
    '风味存在明显主次，但仍保留基础平衡，属于有个性的偏科型结构。',
    '雷达图有清楚方向性，优势风味突出，同时仍有其他维度提供支撑。',
    '这杯酒并非平均分布，而是主动强调某些风味，因此辨识度较高。',
  ], seed, 'balance-general')
}

function buildAdjustmentSuggestions(flavor, ingredients, amounts, seed) {
  const sweet = flavor.sweet ?? 0
  const sour = flavor.sour ?? 0
  const bitter = flavor.bitter ?? 0
  const spirit = flavor.spirit ?? 0
  const fruity = flavor.fruity ?? 0
  const herbal = flavor.herbal ?? 0
  const ids = ingredients.map((item) => item.id)
  const suggestions = []

  if (sweet >= 55 && sour <= 28) {
    suggestions.push('减少糖浆、石榴糖浆或甜味利口酒，或增加少量柠檬汁/青柠汁。')
  }
  if (sour >= 52 && sweet <= 25) {
    suggestions.push('补少量糖浆或蜂蜜糖浆，让酸度更圆润，入口不那么尖。')
  }
  if (spirit >= 55) {
    suggestions.push('增加少量苏打水、果汁或冰融水，可以降低酒精刺激并拉长饮用。')
  }
  if (spirit <= 22) {
    suggestions.push('减少无酒精辅料，或提高基酒比例，让尾韵和骨架更清楚。')
  }
  if (bitter >= 48 && sweet <= 30) {
    suggestions.push('降低苦味酒/苦精比例，或补一点甜味，让收尾更易接受。')
  }
  if (herbal >= 58 && fruity <= 30) {
    suggestions.push('补少量柑橘汁或橙味利口酒，可以让草本香气更明亮、更亲和。')
  }
  if (fruity >= 58 && bitter <= 18 && herbal <= 20) {
    suggestions.push('加入极少量苦精或干味美思，可增加骨架，避免风味过于果汁化。')
  }
  if (ids.includes('cream') && sour >= 35) {
    suggestions.push('奶油与高酸组合容易出现口感冲突，建议降低柑橘汁或调整加入顺序。')
  }
  if (ids.includes('egg-white') && !ids.some((id) => ['lemon-juice', 'lime-juice'].includes(id))) {
    suggestions.push('蛋清需要一定酸度帮助形成稳定泡沫，可增加少量柠檬汁或青柠汁。')
  }
  if (ids.includes('cola') && sweet >= 50) {
    suggestions.push('可乐已经提供较多甜度，其他糖浆建议降低或取消。')
  }
  if (ids.includes('mint') && amounts.mint === 'high') {
    suggestions.push('薄荷用量较高时容易产生青涩味，建议轻拍而不是过度捣碎。')
  }

  if (!suggestions.length) {
    suggestions.push(
      chooseStableText([
        '当前结构没有明显短板，建议先保持比例，只通过冰量和稀释度微调。',
        '这杯酒的主要风味已经清楚，不必继续增加辅料，避免信息过载。',
        '整体结构较完整，可以尝试改变杯型或工艺，而不是继续堆叠味道。',
      ], seed, 'suggestion-balanced'),
    )
  }

  if (suggestions.length === 1) {
    suggestions.push(
      chooseStableText([
        '下一版只调整一个变量，便于判断风味变化来自哪里。',
        '建议以 5–10 mL 为步进修改比例，不要一次改变多个辅料。',
        '先充分冰镇并控制稀释，再判断配方本身是否需要修改。',
      ], seed, 'suggestion-method'),
    )
  }

  return suggestions.slice(0, 2)
}

function buildTastingInterpretation({
  flavor,
  spirit,
  ingredients,
  amounts,
  technique,
  glass,
  signature,
}) {
  const axes = getSortedFlavorAxes(flavor)
  const dominant = axes[0]
  const secondary = axes[1]
  const lowest = [...axes].sort((a, b) => a.value - b.value)[0]
  const ids = ingredients.map((item) => item.id)

  const openingBank = {
    sweet: [
      '第一口会先感受到圆润甜味，随后其他风味才逐渐展开。',
      '入口柔和，甜感先包住舌面，再释放基酒和辅料香气。',
      '开场偏顺滑，甜度降低了酒精刺激，也让风味显得更亲和。',
    ],
    sour: [
      '第一口酸度迅速提亮口腔，整体节奏清楚而有冲击力。',
      '入口先出现明亮酸感，唾液感被迅速唤起，清爽度很高。',
      '酸味负责开场，风味一开始就显得紧致、活跃。',
    ],
    bitter: [
      '入口已经能感受到轻微苦香，中段后苦韵会继续放大。',
      '开场偏成熟，苦感不是最后才出现，而是从第一口就参与结构。',
      '入口克制、不甜腻，苦香很早就建立了这杯酒的基调。',
    ],
    spirit: [
      '第一口基酒存在感直接，酒精热度和香气同时出现。',
      '入口力量感较强，基酒先建立骨架，辅料随后补充细节。',
      '酒感从开场就很清楚，适合小口慢饮，而不是快速畅饮。',
    ],
    fruity: [
      '第一口由果香打开，香气直观、鲜活，饮用门槛较低。',
      '入口先感受到果味的新鲜感，基酒被包裹得更柔和。',
      '果香是最容易识别的开场，整体显得明亮而友好。',
    ],
    herbal: [
      '入口先出现植物与香料气息，风格干爽而有辨识度。',
      '草本香气在第一口就很清楚，甜味退居背景。',
      '开场偏冷冽，植物气息比果味更先被感知。',
    ],
  }

  let middle = buildPairInterpretation(dominant, secondary, signature)
  let finish = buildAxisSentence(
    axes.find((axis) => ['bitter', 'spirit', 'herbal'].includes(axis.key)) ??
      secondary,
    'finish',
    signature,
  )

  if (ids.includes('egg-white')) {
    middle += ' 蛋清泡沫会把酸感和酒感磨得更细，口感从尖锐转为绵密。'
  } else if (ids.includes('cream')) {
    middle += ' 奶油让中段更厚、更顺滑，也会降低香气的锐利度。'
  } else if (ids.some((id) => ['soda-water', 'tonic-water', 'ginger-beer', 'cola'].includes(id))) {
    middle += ' 气泡会把香气向上推，使中段更轻快，并减少停滞感。'
  }

  if (technique?.id === 'shake') {
    finish += ' 摇和带来的稀释与低温会让收尾更紧致。'
  } else if (technique?.id === 'stir') {
    finish += ' 搅拌保留了较高透明度和基酒轮廓，尾段更干净。'
  } else if (technique?.id === 'build') {
    finish += ' 直调使各辅料边界较清楚，随着冰块融化会逐渐柔和。'
  }

  const styleTitles = {
    sweet: ['甜润柔和型', '圆润果甜型', '顺滑易饮型'],
    sour: ['明亮酸爽型', '清冽酸感型', '高张力清爽型'],
    bitter: ['成熟苦香型', '干苦慢饮型', '复杂苦韵型'],
    spirit: ['烈酒骨架型', '强酒体慢饮型', '基酒主导型'],
    fruity: ['鲜活果香型', '明亮果味型', '亲和果香型'],
    herbal: ['草本香料型', '冷冽植物型', '干爽草本型'],
  }

  const drinkability =
    (flavor.spirit ?? 0) >= 55
      ? '建议小口慢饮'
      : (flavor.sweet ?? 0) >= 55
        ? '易入口但注意甜腻'
        : (flavor.sour ?? 0) >= 55
          ? '清爽但酸感突出'
          : '整体饮用节奏适中'

  const glassNoteMap = {
    highball: '高球杯让香气和气泡向上延伸，更适合轻松长饮。',
    'old-fashioned': '古典杯强调酒体和冰块融化，适合慢慢观察风味变化。',
    martini: '马天尼杯放大香气与低温感，入口会更直接、更冷冽。',
    coupe: '浅碟杯让香气更柔和地展开，适合细腻泡沫或酸酒结构。',
  }

  const contributions = ingredients
    .map((ingredient) =>
      getIngredientContribution(
        ingredient,
        amounts[ingredient.id] ?? 'standard',
        signature,
      ),
    )
    .sort((a, b) => {
      const amountRank = { '用量偏高': 3, '标准用量': 2, '用量克制': 1 }
      return amountRank[b.amountText] - amountRank[a.amountText]
    })
    .slice(0, 3)

  return {
    title: chooseStableText(
      styleTitles[dominant.key],
      signature,
      `style-${dominant.key}`,
    ),
    summary: `${dominant.label}是最突出的维度（${dominant.value}），其次是${secondary.label}（${secondary.value}）；${lowest.label}最低（${lowest.value}）。`,
    tags: buildFlavorTags(flavor, ingredients),
    opening: chooseStableText(
      openingBank[dominant.key],
      signature,
      `opening-${dominant.key}`,
    ),
    middle,
    finish,
    balance: buildBalanceDiagnosis(flavor, signature),
    drinkability,
    glassNote:
      glassNoteMap[glass?.id] ??
      '当前杯型会影响香气释放、温度保持和饮用节奏。',
    contributions,
    suggestions: buildAdjustmentSuggestions(
      flavor,
      ingredients,
      amounts,
      signature,
    ),
  }
}

function FlavorInterpretationCard({
  flavor,
  spirit,
  ingredients,
  amounts,
  technique,
  glass,
  signature,
}) {
  const interpretation = buildTastingInterpretation({
    flavor,
    spirit,
    ingredients,
    amounts,
    technique,
    glass,
    signature,
  })

  return (
    <section className="result-card flavor-interpretation-card">
      <div className="result-card-heading interpretation-heading">
        <div>
          <small>TASTING INTERPRETATION</small>
          <h3>风味解读</h3>
        </div>
        <span className="interpretation-style-badge">
          {interpretation.title}
        </span>
      </div>

      <p className="interpretation-summary">{interpretation.summary}</p>

      <div className="interpretation-tags">
        {interpretation.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="tasting-timeline">
        <article>
          <span>01</span>
          <div>
            <small>入口</small>
            <p>{interpretation.opening}</p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <small>中段</small>
            <p>{interpretation.middle}</p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <small>收尾</small>
            <p>{interpretation.finish}</p>
          </div>
        </article>
      </div>

      <div className="balance-diagnosis">
        <small>BALANCE DIAGNOSIS</small>
        <h4>平衡诊断</h4>
        <p>{interpretation.balance}</p>
        <div>
          <span>{interpretation.drinkability}</span>
          <span>{interpretation.glassNote}</span>
        </div>
      </div>

      <div className="ingredient-contribution-section">
        <small>INGREDIENT CONTRIBUTION</small>
        <h4>关键辅料贡献</h4>
        <div className="ingredient-contribution-list">
          {interpretation.contributions.map((item) => (
            <article key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.amountText}</span>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="adjustment-suggestion-box">
        <small>NEXT VERSION</small>
        <h4>下一版怎么调</h4>
        <ul>
          {interpretation.suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FlavorRadar({ flavor }) {
  const size = 320
  const center = size / 2
  const radius = 92
  const labelClasses = [
    'label-top',
    'label-top-right',
    'label-bottom-right',
    'label-bottom',
    'label-bottom-left',
    'label-top-left',
  ]

  const points = flavorAxes.map(([key, label], index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / flavorAxes.length
    const valueRadius = ((flavor[key] ?? 0) / 100) * radius

    return {
      key,
      label,
      value: flavor[key] ?? 0,
      x: center + Math.cos(angle) * valueRadius,
      y: center + Math.sin(angle) * valueRadius,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
      labelClass: labelClasses[index],
    }
  })

  const polygon = points.map((point) => `${point.x},${point.y}`).join(' ')
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1]

  return (
    <div className="flavor-radar-layout">
      <div className="radar-shell">
        <svg
          className="flavor-radar"
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="本杯鸡尾酒六维风味雷达"
        >
          <defs>
            <radialGradient id="radarFill" cx="50%" cy="42%" r="70%">
              <stop offset="0%" stopColor="#f2d19a" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#c78b45" stopOpacity="0.16" />
            </radialGradient>
            <filter id="radarGlow">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {gridLevels.map((level) => {
            const gridPoints = points
              .map((_, index) => {
                const angle =
                  -Math.PI / 2 + (index * Math.PI * 2) / flavorAxes.length

                return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`
              })
              .join(' ')

            return (
              <polygon
                key={level}
                points={gridPoints}
                fill="none"
                stroke="rgba(228, 189, 126, 0.22)"
                strokeWidth="1.2"
              />
            )
          })}

          {points.map((point) => (
            <line
              key={point.key}
              x1={center}
              y1={center}
              x2={point.axisX}
              y2={point.axisY}
              stroke="rgba(228, 189, 126, 0.18)"
              strokeWidth="1.2"
            />
          ))}

          <polygon
            points={polygon}
            fill="url(#radarFill)"
            stroke="#f0ca84"
            strokeWidth="2.5"
            filter="url(#radarGlow)"
          />

          {points.map((point) => (
            <circle
              key={`${point.key}-dot`}
              cx={point.x}
              cy={point.y}
              r="7.5"
              fill="#f7d79c"
              stroke="#8f5b26"
              strokeWidth="2"
            />
          ))}
        </svg>

        {points.map((point) => (
          <div key={`${point.key}-label`} className={`radar-vertex-label ${point.labelClass}`}>
            <span>{point.label}</span>
            <strong>{point.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}


const bartenderChallenges = [
  {
    id: 'summer-breeze',
    title: '夏夜微风',
    icon: '🌬️',
    difficulty: '入门',
    description: '做一杯清爽、带气泡、适合夏夜慢慢喝的长饮。',
    requiredSpirit: 'rum',
    requiredAny: ['lemon-juice', 'lime-juice', 'orange-juice'],
    requireBubbles: true,
    flavorMax: { sweet: 48 },
    minScore: 72,
  },
  {
    id: 'pink-party',
    title: '粉红派对',
    icon: '🩷',
    difficulty: '入门',
    description: '做一杯果香明显、酒感柔和的粉红色作品。',
    requiredAny: ['cranberry-juice', 'grenadine'],
    flavorMin: { fruity: 48 },
    flavorMax: { spirit: 48 },
    forbidden: ['cream'],
    minScore: 70,
  },
  {
    id: 'botanical-night',
    title: '植物夜航',
    icon: '🌿',
    difficulty: '进阶',
    description: '突出草本香料，但不能让甜度抢走注意力。',
    requiredSpirit: 'gin',
    flavorMin: { herbal: 55 },
    flavorMax: { sweet: 38 },
    minScore: 74,
  },
  {
    id: 'dark-and-bubbly',
    title: '深色气泡',
    icon: '🌑',
    difficulty: '入门',
    description: '以深色气泡为主题，做一杯有烈酒骨架的长饮。',
    requiredAny: ['cola'],
    flavorMin: { spirit: 30 },
    requiredGlass: 'highball',
    minScore: 68,
  },
  {
    id: 'citrus-sharp',
    title: '柑橘锋线',
    icon: '🍋',
    difficulty: '进阶',
    description: '做一杯酸度明亮但不过分尖锐的柑橘型鸡尾酒。',
    requiredAny: ['lemon-juice', 'lime-juice'],
    flavorMin: { sour: 42 },
    flavorMax: { sour: 72, sweet: 48 },
    minScore: 74,
  },
  {
    id: 'low-sweet-high-spirit',
    title: '干爽烈酒',
    icon: '🧊',
    difficulty: '困难',
    description: '甜度必须克制，同时保持清楚的基酒存在感。',
    flavorMin: { spirit: 52 },
    flavorMax: { sweet: 25 },
    forbidden: ['grenadine', 'cream'],
    minScore: 75,
  },
  {
    id: 'tropical-bubbles',
    title: '热带气泡',
    icon: '🏝️',
    difficulty: '进阶',
    description: '做一杯有热带果香、气泡和轻快节奏的作品。',
    requiredSpirit: 'rum',
    requiredAny: ['orange-juice', 'lime-juice'],
    requireBubbles: true,
    flavorMin: { fruity: 42 },
    minScore: 72,
  },
  {
    id: 'bitter-adult',
    title: '成熟苦香',
    icon: '🟥',
    difficulty: '困难',
    description: '苦韵要清楚，但整杯酒仍然需要可饮用。',
    requiredAny: ['campari', 'aromatic-bitters'],
    flavorMin: { bitter: 42 },
    flavorMax: { bitter: 82 },
    minScore: 74,
  },
  {
    id: 'soft-foam',
    title: '丝绒泡沫',
    icon: '☁️',
    difficulty: '进阶',
    description: '使用蛋清做出柔和泡沫，同时保留酸甜结构。',
    requiredAll: ['egg-white'],
    requiredAny: ['lemon-juice', 'lime-juice'],
    requiredTechnique: 'shake',
    minScore: 73,
  },
  {
    id: 'dessert-cocktail',
    title: '午夜甜点',
    icon: '🍫',
    difficulty: '进阶',
    description: '做一杯浓郁、柔滑，但不能只有甜味的餐后酒。',
    requiredAny: ['cream', 'cacao-liqueur'],
    flavorMin: { sweet: 35 },
    flavorMax: { sweet: 72 },
    minScore: 70,
  },
  {
    id: 'tequila-sunset',
    title: '龙舌兰落日',
    icon: '🌅',
    difficulty: '入门',
    description: '使用龙舌兰和暖色果香，完成一杯视觉鲜明的酒。',
    requiredSpirit: 'tequila',
    requiredAny: ['orange-juice', 'grenadine'],
    flavorMin: { fruity: 40 },
    minScore: 70,
  },
  {
    id: 'mint-no-sugar',
    title: '无糖薄荷',
    icon: '🍃',
    difficulty: '困难',
    description: '使用薄荷，但禁止糖浆，仍要维持平衡。',
    requiredAll: ['mint'],
    forbidden: ['sugar-syrup', 'honey-syrup', 'grenadine'],
    flavorMax: { sweet: 35 },
    minScore: 72,
  },
  {
    id: 'brandy-fruit',
    title: '暖果白兰地',
    icon: '🍇',
    difficulty: '进阶',
    description: '让白兰地保持温暖果香，同时避免酒体过重。',
    requiredSpirit: 'brandy',
    flavorMin: { fruity: 35 },
    flavorMax: { spirit: 62 },
    minScore: 72,
  },
  {
    id: 'vodka-clean',
    title: '纯净伏特加',
    icon: '❄️',
    difficulty: '进阶',
    description: '使用伏特加，配方不超过三种辅料，风格干净。',
    requiredSpirit: 'vodka',
    maxIngredients: 3,
    minScore: 74,
  },
  {
    id: 'whisky-orange',
    title: '橙香威士忌',
    icon: '🍊',
    difficulty: '入门',
    description: '让威士忌与橙香形成清晰而成熟的组合。',
    requiredSpirit: 'whisky',
    requiredAny: ['orange-juice', 'triple-sec', 'aromatic-bitters'],
    minScore: 72,
  },
  {
    id: 'highball-only',
    title: '高球练习',
    icon: '🥂',
    difficulty: '入门',
    description: '只使用高球杯，完成一杯轻盈且有气泡的长饮。',
    requiredGlass: 'highball',
    requireBubbles: true,
    flavorMax: { spirit: 52 },
    minScore: 70,
  },
  {
    id: 'three-ingredient',
    title: '三材料极简',
    icon: '3️⃣',
    difficulty: '困难',
    description: '最多三种辅料，做出清楚、完整、有辨识度的结构。',
    maxIngredients: 3,
    minScore: 78,
  },
  {
    id: 'sweet-sour-balance',
    title: '酸甜等高',
    icon: '⚖️',
    difficulty: '困难',
    description: '甜感与酸度差距不能超过 12，考验比例控制。',
    customRule: 'sweetSourGap',
    minScore: 76,
  },
  {
    id: 'herbal-fruity',
    title: '果香与草本',
    icon: '🌱',
    difficulty: '进阶',
    description: '果香和草本都要出现，且不能由单一维度完全主导。',
    flavorMin: { fruity: 32, herbal: 32 },
    flavorMax: { fruity: 72, herbal: 72 },
    minScore: 73,
  },
  {
    id: 'bartender-signature',
    title: '酒保招牌',
    icon: '🏅',
    difficulty: '大师',
    description: '不限制原料，但评分需达到 85，且五项特点都不低于 14。',
    minScore: 85,
    requireDimensionsMin: 14,
  },
]

function getTodayChallengeIndex() {
  const now = new Date()
  const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  return dayKey
    .split('')
    .reduce((sum, character) => sum + character.charCodeAt(0), 0) %
    bartenderChallenges.length
}

function getClassicDifficulty(cocktail) {
  const complexity = cocktail.ingredients.length
  if (complexity <= 1) return '入门'
  if (complexity <= 2) return '进阶'
  return '困难'
}

function getClassicClues(cocktail) {
  const topAxes = Object.entries(cocktail.flavor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => flavorChineseMap[key])

  const techniqueClue = {
    shake: '需要充分降温与融合',
    stir: '强调清澈和基酒轮廓',
    build: '适合直接在杯中完成',
  }[cocktail.technique]

  return [
    `主导风味：${topAxes.join('、')}`,
    techniqueClue,
    `经典结构包含 ${cocktail.ingredients.length} 种关键辅料`,
  ]
}

function evaluateClassicChallenge(target, selection, flavor) {
  if (!target) return null

  const score = scoreCocktail(target, selection)
  const chosenIds = selection.ingredients.map((item) => item.id)
  const matched = target.ingredients.filter((id) => chosenIds.includes(id))
  const missing = target.ingredients.filter((id) => !chosenIds.includes(id))
  const extras = chosenIds.filter((id) => !target.ingredients.includes(id))

  const flavorDistance = flavorAxes.reduce((sum, [key]) => {
    return sum + Math.abs((flavor[key] ?? 0) - (target.flavor[key] ?? 0))
  }, 0)
  const flavorSimilarity = Math.max(
    0,
    Math.round(100 - flavorDistance / flavorAxes.length),
  )

  const checks = [
    {
      label: '基酒',
      passed: target.spirit === selection.spirit?.id,
      detail:
        target.spirit === selection.spirit?.id
          ? '基酒选择正确'
          : `标准答案是${spiritName(target.spirit)}`,
    },
    {
      label: '关键辅料',
      passed: missing.length === 0,
      detail:
        missing.length === 0
          ? `命中 ${matched.length} 种关键辅料`
          : `还缺少：${missing.map(ingredientName).join('、')}`,
    },
    {
      label: '额外辅料',
      passed: extras.length === 0,
      detail:
        extras.length === 0
          ? '没有加入偏离经典结构的辅料'
          : `额外加入：${extras.map(ingredientName).join('、')}`,
    },
    {
      label: '调制工艺',
      passed: target.technique === selection.technique?.id,
      detail:
        target.technique === selection.technique?.id
          ? '工艺匹配'
          : `经典工艺是${techniqueName(target.technique)}`,
    },
    {
      label: '杯型',
      passed: target.glasses.includes(selection.glass?.id),
      detail:
        target.glasses.includes(selection.glass?.id)
          ? '杯型匹配'
          : `推荐杯型：${target.glasses
              .map((id) => glasses.find((glass) => glass.id === id)?.chinese)
              .filter(Boolean)
              .join(' / ')}`,
    },
    {
      label: '风味轮廓',
      passed: flavorSimilarity >= 72,
      detail: `与标准六维风味相似度 ${flavorSimilarity}%`,
    },
  ]

  return {
    score,
    flavorSimilarity,
    matched,
    missing,
    extras,
    checks,
    passedCount: checks.filter((item) => item.passed).length,
    badge:
      score >= 90
        ? '经典复刻大师'
        : score >= 78
          ? '高度还原'
          : score >= 62
            ? '抓住轮廓'
            : '继续练习',
  }
}

function evaluateBartenderChallenge(challenge, selection, flavor, review) {
  if (!challenge) return null

  const ids = selection.ingredients.map((item) => item.id)
  const checks = []

  if (challenge.requiredSpirit) {
    checks.push({
      label: `使用${spiritName(challenge.requiredSpirit)}`,
      passed: selection.spirit?.id === challenge.requiredSpirit,
    })
  }

  if (challenge.requiredAll) {
    challenge.requiredAll.forEach((id) => {
      checks.push({
        label: `必须加入${ingredientName(id)}`,
        passed: ids.includes(id),
      })
    })
  }

  if (challenge.requiredAny) {
    checks.push({
      label: `至少加入：${challenge.requiredAny
        .filter((id) => ingredients.some((item) => item.id === id))
        .map(ingredientName)
        .join(' / ')}`,
      passed: challenge.requiredAny.some((id) => ids.includes(id)),
    })
  }

  if (challenge.forbidden) {
    challenge.forbidden.forEach((id) => {
      checks.push({
        label: `禁止使用${ingredientName(id)}`,
        passed: !ids.includes(id),
      })
    })
  }

  if (challenge.requireBubbles) {
    checks.push({
      label: '必须带气泡',
      passed: ids.some((id) =>
        ['soda-water', 'tonic-water', 'cola', 'ginger-beer'].includes(id),
      ),
    })
  }

  if (challenge.requiredTechnique) {
    checks.push({
      label: `工艺：${techniqueName(challenge.requiredTechnique)}`,
      passed: selection.technique?.id === challenge.requiredTechnique,
    })
  }

  if (challenge.requiredGlass) {
    checks.push({
      label: `杯型：${glasses.find((item) => item.id === challenge.requiredGlass)?.chinese}`,
      passed: selection.glass?.id === challenge.requiredGlass,
    })
  }

  if (challenge.maxIngredients) {
    checks.push({
      label: `辅料不超过 ${challenge.maxIngredients} 种`,
      passed: selection.ingredients.length <= challenge.maxIngredients,
    })
  }

  Object.entries(challenge.flavorMin ?? {}).forEach(([key, value]) => {
    checks.push({
      label: `${flavorChineseMap[key]}不低于 ${value}`,
      passed: (flavor[key] ?? 0) >= value,
    })
  })

  Object.entries(challenge.flavorMax ?? {}).forEach(([key, value]) => {
    checks.push({
      label: `${flavorChineseMap[key]}不高于 ${value}`,
      passed: (flavor[key] ?? 0) <= value,
    })
  })

  if (challenge.customRule === 'sweetSourGap') {
    checks.push({
      label: '甜感与酸度差距不超过 12',
      passed: Math.abs((flavor.sweet ?? 0) - (flavor.sour ?? 0)) <= 12,
    })
  }

  if (challenge.requireDimensionsMin) {
    const dimensionValues = Object.values(review.dimensions)
    checks.push({
      label: `五项特点均不低于 ${challenge.requireDimensionsMin}`,
      passed: dimensionValues.every(
        (value) => value >= challenge.requireDimensionsMin,
      ),
    })
  }

  checks.push({
    label: `创作评分达到 ${challenge.minScore}`,
    passed: review.score >= challenge.minScore,
  })

  const passedCount = checks.filter((item) => item.passed).length
  const completion = Math.round((passedCount / checks.length) * 100)

  return {
    checks,
    passedCount,
    completion,
    badge:
      completion === 100
        ? '完美完成'
        : completion >= 80
          ? '优秀酒保'
          : completion >= 60
            ? '接近成功'
            : '挑战未完成',
  }
}

function ModeBanner({ mode, classicTarget, bartenderChallenge }) {
  if (mode === 'free') return null

  if (mode === 'classic' && classicTarget) {
    return (
      <aside className="mode-banner classic-mode-banner">
        <div>
          <small>CLASSIC CHALLENGE</small>
          <strong>
            正在复刻：{classicTarget.chinese} · {classicTarget.name}
          </strong>
        </div>
        <span>不要偷看答案，凭风味线索完成配方</span>
      </aside>
    )
  }

  if (mode === 'bartender' && bartenderChallenge) {
    return (
      <aside className="mode-banner bartender-mode-banner">
        <div>
          <small>BARTENDER CHALLENGE</small>
          <strong>
            {bartenderChallenge.icon} {bartenderChallenge.title}
          </strong>
        </div>
        <span>{bartenderChallenge.description}</span>
      </aside>
    )
  }

  return null
}

function App() {
  const [page, setPage] = useState('home')
  const [gameMode, setGameMode] = useState('free')
  const [classicTarget, setClassicTarget] = useState(null)
  const [bartenderChallengeIndex, setBartenderChallengeIndex] = useState(
    getTodayChallengeIndex,
  )
  const [selectedSpirit, setSelectedSpirit] = useState(null)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredientAmounts, setIngredientAmounts] = useState({})
  const [activeIngredientInfo, setActiveIngredientInfo] = useState(null)
  const [selectedTechnique, setSelectedTechnique] = useState(null)
  const [selectedGlass, setSelectedGlass] = useState(null)
  const [activeGlassIndex, setActiveGlassIndex] = useState(0)
  const [activeResultPhotoIndex, setActiveResultPhotoIndex] = useState(0)
  const [collection, setCollection] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cocktail-collection') ?? '[]')
    } catch {
      return []
    }
  })

  const glassCarouselRef = useRef(null)
  const glassCardRefs = useRef([])
  const scrollTimerRef = useRef(null)

  const activeBartenderChallenge =
    bartenderChallenges[bartenderChallengeIndex] ?? bartenderChallenges[0]


  const drinkAppearance = useMemo(
    () => getDrinkAppearance(selectedSpirit, selectedIngredients, selectedTechnique),
    [selectedSpirit, selectedIngredients, selectedTechnique],
  )

  const drinkColor = useMemo(() => drinkAppearance, [drinkAppearance])

  const drinkEffects = useMemo(
    () => getDrinkEffects(selectedIngredients, selectedTechnique, drinkAppearance),
    [selectedIngredients, selectedTechnique, drinkAppearance],
  )

  const userFlavor = useMemo(
    () => calculateUserFlavor(selectedSpirit, selectedIngredients, ingredientAmounts),
    [selectedSpirit, selectedIngredients, ingredientAmounts],
  )

  const resultCocktail = useMemo(() => {
    if (!selectedSpirit || !selectedTechnique || !selectedGlass) return null

    return findBestCocktail(
      {
        spirit: selectedSpirit,
        ingredients: selectedIngredients,
        amounts: ingredientAmounts,
        technique: selectedTechnique,
        glass: selectedGlass,
      },
      userFlavor,
    )
  }, [
    selectedSpirit,
    selectedIngredients,
    ingredientAmounts,
    selectedTechnique,
    selectedGlass,
    userFlavor,
  ])

  const creativeReview = useMemo(() => {
    if (!selectedSpirit || !selectedTechnique || !selectedGlass) return null

    return buildCreativeReview(
      {
        spirit: selectedSpirit,
        ingredients: selectedIngredients,
        amounts: ingredientAmounts,
        technique: selectedTechnique,
        glass: selectedGlass,
      },
      userFlavor,
      resultCocktail,
    )
  }, [
    selectedSpirit,
    selectedIngredients,
    ingredientAmounts,
    selectedTechnique,
    selectedGlass,
    userFlavor,
    resultCocktail,
  ])

  useEffect(() => {
    if (page !== 'glasses') return

    const activeGlass = glasses[activeGlassIndex]
    setSelectedGlass(activeGlass)

    requestAnimationFrame(() => {
      glassCardRefs.current[activeGlassIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    })
  }, [page, activeGlassIndex])

  function toggleIngredient(ingredient) {
    const exists = selectedIngredients.some((item) => item.id === ingredient.id)

    if (exists) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.id !== ingredient.id),
      )
      setIngredientAmounts((current) => {
        const next = { ...current }
        delete next[ingredient.id]
        return next
      })
      return
    }

    if (selectedIngredients.length < 5) {
      setSelectedIngredients([...selectedIngredients, ingredient])
      setIngredientAmounts((current) => ({
        ...current,
        [ingredient.id]: 'standard',
      }))
    }
  }

  function setIngredientAmount(ingredientId, level) {
    setIngredientAmounts((current) => ({
      ...current,
      [ingredientId]: level,
    }))
  }

  function resetRecipeSelection() {
    setSelectedSpirit(null)
    setSelectedIngredients([])
    setIngredientAmounts({})
    setActiveIngredientInfo(null)
    setSelectedTechnique(null)
    setSelectedGlass(null)
    setActiveGlassIndex(0)
  }

  function startMode(mode) {
    resetRecipeSelection()
    setGameMode(mode)

    if (mode === 'classic') {
      setClassicTarget(null)
      setPage('classic-select')
      return
    }

    if (mode === 'bartender') {
      setPage('bartender-brief')
      return
    }

    setClassicTarget(null)
    setPage('spirits')
  }

  function goHome() {
    setPage('home')
    setGameMode('free')
    setClassicTarget(null)
    resetRecipeSelection()
  }

  function chooseGlass(index) {
    const safeIndex = Math.max(0, Math.min(glasses.length - 1, index))
    setActiveGlassIndex(safeIndex)
    setSelectedGlass(glasses[safeIndex])
  }

  function handleGlassScroll() {
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current)
    }

    scrollTimerRef.current = window.setTimeout(() => {
      const container = glassCarouselRef.current
      if (!container) return

      const center = container.scrollLeft + container.clientWidth / 2
      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      glassCardRefs.current.forEach((card, index) => {
        if (!card) return
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(center - cardCenter)

        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      if (nearestIndex !== activeGlassIndex) {
        setActiveGlassIndex(nearestIndex)
        setSelectedGlass(glasses[nearestIndex])
      }
    }, 90)
  }


  useEffect(() => {
    if (page === 'result') {
      setActiveResultPhotoIndex(0)
    }
  }, [page, creativeReview?.signature])

  function addResultToCollection() {
    if (!creativeReview) return

    const nextCollection = Array.from(
      new Set([...collection, creativeReview.signature]),
    )
    setCollection(nextCollection)
    localStorage.setItem('cocktail-collection', JSON.stringify(nextCollection))
  }




  if (page === 'result' && resultCocktail && creativeReview) {
    const isCollected = collection.includes(creativeReview.signature)
    const colorPoetry = getColorPoetry(drinkAppearance)
    const selection = {
      spirit: selectedSpirit,
      ingredients: selectedIngredients,
      amounts: ingredientAmounts,
      technique: selectedTechnique,
      glass: selectedGlass,
    }
    const displayClassic =
      gameMode === 'classic' && classicTarget ? classicTarget : resultCocktail
    const classicTechnique = techniques.find(
      (item) => item.id === displayClassic.technique,
    )
    const classicGlasses = glasses.filter((item) =>
      displayClassic.glasses.includes(item.id),
    )
    const similarity =
      gameMode === 'classic'
        ? scoreCocktail(displayClassic, selection)
        : resultCocktail.score ?? 0
    const classicChallengeResult =
      gameMode === 'classic'
        ? evaluateClassicChallenge(displayClassic, selection, userFlavor)
        : null
    const bartenderChallengeResult =
      gameMode === 'bartender'
        ? evaluateBartenderChallenge(
            activeBartenderChallenge,
            selection,
            userFlavor,
            creativeReview,
          )
        : null

    return (
      <main className="app result-page-app result-v14-page">
        <section className="mixing-panel result-panel result-v14-panel">
          <div className="top-bar">
            <button className="back-button" onClick={() => setPage('glasses')}>
              ← 返回杯型
            </button>
            <span className="step-label">RESULT V14</span>
          </div>

          {classicChallengeResult && (
            <section className="challenge-result-card classic-result-card">
              <div className="challenge-result-score">
                <small>REPLICA ACCURACY</small>
                <strong>{classicChallengeResult.score}%</strong>
                <span>{classicChallengeResult.badge}</span>
              </div>
              <div className="challenge-result-content">
                <div className="challenge-result-title">
                  <div>
                    <small>CLASSIC CHALLENGE RESULT</small>
                    <h2>
                      {displayClassic.chinese} · {displayClassic.name}
                    </h2>
                  </div>
                  <span>
                    达成 {classicChallengeResult.passedCount} /{' '}
                    {classicChallengeResult.checks.length}
                  </span>
                </div>
                <div className="challenge-check-grid">
                  {classicChallengeResult.checks.map((check) => (
                    <article
                      key={check.label}
                      className={check.passed ? 'passed' : 'failed'}
                    >
                      <b>{check.passed ? '✓' : '×'}</b>
                      <div>
                        <strong>{check.label}</strong>
                        <p>{check.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {bartenderChallengeResult && (
            <section className="challenge-result-card bartender-result-card">
              <div className="challenge-result-score">
                <small>CHALLENGE COMPLETION</small>
                <strong>{bartenderChallengeResult.completion}%</strong>
                <span>{bartenderChallengeResult.badge}</span>
              </div>
              <div className="challenge-result-content">
                <div className="challenge-result-title">
                  <div>
                    <small>BARTENDER CHALLENGE RESULT</small>
                    <h2>
                      {activeBartenderChallenge.icon}{' '}
                      {activeBartenderChallenge.title}
                    </h2>
                  </div>
                  <span>
                    达成 {bartenderChallengeResult.passedCount} /{' '}
                    {bartenderChallengeResult.checks.length}
                  </span>
                </div>
                <div className="challenge-check-grid compact">
                  {bartenderChallengeResult.checks.map((check) => (
                    <article
                      key={check.label}
                      className={check.passed ? 'passed' : 'failed'}
                    >
                      <b>{check.passed ? '✓' : '×'}</b>
                      <strong>{check.label}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="result-v8-hero result-v14-hero">
            <div className="hero-visual-column">
              <CocktailPhotoResult
                drinkName={creativeReview.title}
                appearance={drinkAppearance}
                glass={selectedGlass}
                spirit={selectedSpirit}
                ingredients={selectedIngredients}
                signature={creativeReview.signature}
              />
            </div>

            <div className="result-v8-summary">
              <div className="result-score-badge">
                <strong>{creativeReview.score}</strong>
                <span>{creativeReview.scoreLabel}</span>
              </div>

              <div className="result-summary-copy">
                <small>ORIGINAL DRINK</small>
                <h2>{creativeReview.title}</h2>
                <h3>这一口喝下去是什么感觉</h3>
                <p>{creativeReview.praise}</p>

                <div className="story-tags">
                  {creativeReview.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="color-poetry-card">
                <small>MOOD</small>
                <strong>{drinkEffects.colorNote}</strong>
                <p>{colorPoetry}</p>
              </div>
            </div>
          </section>

          <section className="creative-dimension-card">
            <div className="result-card-heading">
              <div>
                <small>CHARACTER</small>
                <h3>酒的特点</h3>
              </div>
            </div>

            <div className="creative-dimension-grid">
              <article>
                <strong>{creativeReview.dimensions.balance}</strong>
                <span>平衡感</span>
                <p>甜、酸、苦与酒感之间的协调程度。</p>
              </article>
              <article>
                <strong>{creativeReview.dimensions.layering}</strong>
                <span>层次感</span>
                <p>入口、中段和尾韵有没有变化。</p>
              </article>
              <article>
                <strong>{creativeReview.dimensions.completion}</strong>
                <span>完成度</span>
                <p>工艺与杯型是否把味道撑起来。</p>
              </article>
              <article>
                <strong>{creativeReview.dimensions.creativity}</strong>
                <span>辨识度</span>
                <p>这杯酒有没有自己的风格和记忆点。</p>
              </article>
              <article>
                <strong>{creativeReview.dimensions.atmosphere}</strong>
                <span>收口</span>
                <p>尾韵与整体氛围是否舒服、耐喝。</p>
              </article>
            </div>
          </section>

          <div className="result-grid result-v8-grid">
            <section className="result-card radar-card radar-card-v8">
              <div className="result-card-heading">
                <div>
                  <small>FLAVOR PROFILE</small>
                  <h3>六维风味画像</h3>
                </div>
              </div>
              <FlavorRadar flavor={userFlavor} />
            </section>

            <FlavorInterpretationCard
              flavor={userFlavor}
              spirit={selectedSpirit}
              ingredients={selectedIngredients}
              amounts={ingredientAmounts}
              technique={selectedTechnique}
              glass={selectedGlass}
              signature={creativeReview.signature}
            />

            <section className="result-card compare-card-v13">
              <div className="compare-heading-v13">
                <div>
                  <small>CLASSIC VS YOUR DRINK</small>
                  <h3>最像的经典酒 vs 我的配方</h3>
                </div>

                <div className="similarity-badge-v13">
                  <small>SIMILARITY</small>
                  <strong>{similarity}%</strong>
                  <span>
                    {similarity >= 85
                      ? '非常接近经典范式'
                      : similarity >= 70
                        ? '能明显喝出经典影子'
                        : '有经典轮廓，更偏个人版本'}
                  </span>
                </div>
              </div>

              <div className="recipe-compare-grid-v13">
                <article className="recipe-compare-column-v13 classic">
                  <div className="compare-column-head-v13">
                    <small>CLASSIC</small>
                    <h4>
                      {displayClassic.chinese} · {displayClassic.name}
                    </h4>
                    <p>{displayClassic.description}</p>
                  </div>

                  <ul className="recipe-compare-list-v13">
                    {displayClassic.ingredients.map((id) => (
                      <li key={id}>
                        <span>{ingredientMap[id]?.icon ?? '•'}</span>
                        <div>
                          <strong>{ingredientMap[id]?.chinese ?? id}</strong>
                          <small>{ingredientMap[id]?.name ?? id}</small>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="compare-meta-v13">
                    <span>
                      <small>工艺</small>
                      <strong>
                        {classicTechnique?.chinese} · {classicTechnique?.name}
                      </strong>
                    </span>
                    <span>
                      <small>杯型</small>
                      <strong>
                        {classicGlasses
                          .map((item) => item.chinese)
                          .join(' / ')}
                      </strong>
                    </span>
                  </div>
                </article>

                <article className="recipe-compare-column-v13 mine">
                  <div className="compare-column-head-v13">
                    <small>MINE</small>
                    <h4>{creativeReview.title}</h4>
                    <p>{creativeReview.shortIntro}</p>
                  </div>

                  <ul className="recipe-compare-list-v13">
                    {selectedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        <span>{ingredient.icon}</span>
                        <div>
                          <strong>{ingredient.chinese}</strong>
                          <small>
                            {amountLevelName(
                              ingredientAmounts[ingredient.id] ?? 'standard',
                            )}{' '}
                            {amountLabel(
                              ingredient.id,
                              ingredientAmounts[ingredient.id] ?? 'standard',
                            )}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="compare-meta-v13">
                    <span>
                      <small>基酒</small>
                      <strong>
                        {selectedSpirit.chinese} · {selectedSpirit.name}
                      </strong>
                    </span>
                    <span>
                      <small>工艺 / 杯型</small>
                      <strong>
                        {selectedTechnique.chinese} · {selectedGlass.chinese}
                      </strong>
                    </span>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <div className="result-actions result-v8-actions">
            <button
              className="secondary-button"
              onClick={() => {
                resetRecipeSelection()
                setActiveResultPhotoIndex(0)

                if (gameMode === 'classic') {
                  setPage('classic-select')
                } else if (gameMode === 'bartender') {
                  setPage('bartender-brief')
                } else {
                  setPage('spirits')
                }
              }}
            >
              {gameMode === 'classic'
                ? '挑战另一杯经典'
                : gameMode === 'bartender'
                  ? '再接一个挑战'
                  : '再创作一杯'}
            </button>

            <button
              className="primary-button"
              disabled={isCollected}
              onClick={addResultToCollection}
            >
              {isCollected ? '✓ 已收藏这杯作品' : '收藏这杯作品'}
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (page === 'glasses') {
    return (
      <main className="app glass-page-app">
        <section className="mixing-panel glass-panel cinematic-glass-panel">
          <div className="top-bar">
            <button className="back-button" onClick={() => setPage('techniques')}>
              ← 返回
            </button>
            <span className="step-label">STEP 4 / 4</span>
          </div>

          <ModeBanner
            mode={gameMode}
            classicTarget={classicTarget}
            bartenderChallenge={activeBartenderChallenge}
          />

          <div className="section-heading glass-section-heading">
            <p className="eyebrow">CHOOSE THE GLASS</p>
            <h2>选择杯型</h2>
            <p>左右滑动，让酒杯来到你面前。</p>
          </div>

          <div className="cocktail-light-stage" aria-hidden="true">
            <span className="stage-light left" />
            <span className="stage-light center" />
            <span className="stage-light right" />
          </div>

          <div className="glass-top-information">
            <div className="glass-counter">
              <small>GLASS</small>
              <strong>
                {String(activeGlassIndex + 1).padStart(2, '0')}
                <span>/ {String(glasses.length).padStart(2, '0')}</span>
              </strong>
            </div>

            <div className="active-glass-name">
              <small>当前杯型</small>
              <strong>{glasses[activeGlassIndex].chinese}</strong>
              <span>{glasses[activeGlassIndex].name}</span>
            </div>

            <div className="drink-color-display">
              <small>酒液</small>
              <span className="color-chip" style={{ background: drinkColor }} />
            </div>
          </div>

          <div className="glass-carousel-shell">
            <button
              className="carousel-button cinematic-arrow left-arrow"
              onClick={() => chooseGlass(activeGlassIndex - 1)}
              disabled={activeGlassIndex === 0}
              aria-label="上一只酒杯"
            >
              ‹
            </button>

            <div
              className="glass-carousel cinematic-carousel"
              ref={glassCarouselRef}
              onScroll={handleGlassScroll}
            >
              {glasses.map((glass, index) => {
                const isActive = activeGlassIndex === index

                return (
                  <button
                    key={glass.id}
                    ref={(element) => {
                      glassCardRefs.current[index] = element
                    }}
                    className={`glass-option-card cinematic-glass-card ${
                      isActive ? 'active selected' : ''
                    }`}
                    onClick={() => chooseGlass(index)}
                    aria-label={`选择${glass.chinese}`}
                  >
                    <div className="glass-card-glow" aria-hidden="true" />

                    <div className="glass-hero-area cinematic-hero-area">
                      <GlassPreview
                        type={glass.id}
                        color={drinkColor}
                        effects={drinkEffects}
                      />
                    </div>

                    <div className="glass-option-info cinematic-glass-info">
                      <div className="glass-option-title">
                        <strong>{glass.chinese}</strong>
                        <small>{glass.name}</small>
                      </div>
                      <p>{glass.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              className="carousel-button cinematic-arrow right-arrow"
              onClick={() => chooseGlass(activeGlassIndex + 1)}
              disabled={activeGlassIndex === glasses.length - 1}
              aria-label="下一只酒杯"
            >
              ›
            </button>
          </div>

          <div className="glass-pagination" aria-label="杯型切换">
            {glasses.map((glass, index) => (
              <button
                key={glass.id}
                className={activeGlassIndex === index ? 'active' : ''}
                onClick={() => chooseGlass(index)}
                aria-label={`切换到${glass.chinese}`}
              />
            ))}
          </div>

          <div className="glass-swipe-hint">
            <span>‹</span>
            <p>滑动切换</p>
            <span>›</span>
          </div>

          <button
            className="primary-button glass-confirm-button"
            disabled={!selectedGlass}
            onClick={() => setPage('result')}
          >
            调制并查看结果
          </button>
        </section>
      </main>
    )
  }

  if (page === 'techniques') {
    return (
      <main className="app">
        <section className="mixing-panel technique-panel">
          <div className="top-bar">
            <button className="back-button" onClick={() => setPage('ingredients')}>
              ← 返回
            </button>
            <span className="step-label">STEP 3 / 4</span>
          </div>

          <ModeBanner
            mode={gameMode}
            classicTarget={classicTarget}
            bartenderChallenge={activeBartenderChallenge}
          />

          <div className="section-heading">
            <p className="eyebrow">CHOOSE THE METHOD</p>
            <h2>选择调酒工艺</h2>
            <p>工艺会影响温度、稀释度、透明度和口感质地。</p>
          </div>

          <div className="recipe-overview">
            <div>
              <small>基酒</small>
              <strong>{selectedSpirit?.chinese} · {selectedSpirit?.name}</strong>
            </div>
            <div>
              <small>辅料</small>
              <strong>{selectedIngredients.length} 种</strong>
            </div>
          </div>

          <div className="technique-list">
            {techniques.map((technique) => {
              const isSelected = selectedTechnique?.id === technique.id

              return (
                <button
                  key={technique.id}
                  className={`technique-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedTechnique(technique)}
                >
                  <span className="technique-icon">{technique.icon}</span>
                  <span className="technique-content">
                    <span className="technique-title">
                      <strong>{technique.chinese}</strong>
                      <small>{technique.name}</small>
                    </span>
                    <span className="technique-tagline">{technique.tagline}</span>
                    <span className="technique-role">{technique.role}</span>
                    <span className="effect-tags">
                      {technique.effects.map((effect) => (
                        <span key={effect}>{effect}</span>
                      ))}
                    </span>
                  </span>
                  <span className="technique-check">{isSelected ? '✓' : '＋'}</span>
                </button>
              )
            })}
          </div>

          <div className="selection-summary">
            {selectedTechnique ? (
              <>
                <span>当前工艺</span>
                <strong>
                  {selectedTechnique.chinese} · {selectedTechnique.name}
                </strong>
              </>
            ) : (
              <span>请选择一种调酒工艺</span>
            )}
          </div>

          <button
            className="primary-button"
            disabled={!selectedTechnique}
            onClick={() => {
              setActiveGlassIndex(0)
              setSelectedGlass(glasses[0])
              setPage('glasses')
            }}
          >
            下一步：选择杯型
          </button>
        </section>
      </main>
    )
  }

  if (page === 'ingredients') {
    return (
      <main className="app">
        <section className="mixing-panel ingredient-panel">
          <div className="top-bar">
            <button
              className="back-button"
              onClick={() => {
                setPage('spirits')
                setActiveIngredientInfo(null)
              }}
            >
              ← 返回
            </button>
            <span className="step-label">STEP 2 / 4</span>
          </div>

          <ModeBanner
            mode={gameMode}
            classicTarget={classicTarget}
            bartenderChallenge={activeBartenderChallenge}
          />

          <div className="section-heading">
            <p className="eyebrow">BUILD THE FLAVOR</p>
            <h2>添加辅料</h2>
            <p>辅料负责调整酸、甜、苦、香气和质地。选择后再设定少量、标准或较多，最多 5 种。</p>
          </div>

          <div className="current-base-card">
            <span className="current-base-icon">{selectedSpirit?.icon}</span>
            <div>
              <small>当前基酒 · BASE SPIRIT</small>
              <strong>{selectedSpirit?.chinese} · {selectedSpirit?.name}</strong>
            </div>
          </div>

          <div className="ingredient-grid compact-grid">
            {ingredients.map((ingredient) => {
              const isSelected = selectedIngredients.some(
                (item) => item.id === ingredient.id,
              )
              const isDisabled = selectedIngredients.length >= 5 && !isSelected
              const showInfo = activeIngredientInfo === ingredient.id

              return (
                <div
                  key={ingredient.id}
                  className="ingredient-card-wrapper"
                  onMouseEnter={() => setActiveIngredientInfo(ingredient.id)}
                  onMouseLeave={() => setActiveIngredientInfo(null)}
                >
                  <button
                    className={`ingredient-card compact-card ${
                      isSelected ? 'selected' : ''
                    }`}
                    disabled={isDisabled}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    <span className="ingredient-icon">{ingredient.icon}</span>
                    <span className="compact-ingredient-name">
                      <strong>{ingredient.chinese}</strong>
                      <small>{ingredient.name}</small>
                    </span>
                    <span className="ingredient-category">{ingredient.category}</span>
                    <span className="compact-action">{isSelected ? '✓' : '＋'}</span>
                  </button>

                  <button
                    type="button"
                    className="info-button"
                    aria-label={`查看${ingredient.chinese}的作用`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setActiveIngredientInfo(showInfo ? null : ingredient.id)
                    }}
                  >
                    ⓘ
                  </button>

                  {showInfo && (
                    <div className="ingredient-tooltip">
                      <div className="tooltip-heading">
                        <span>{ingredient.icon}</span>
                        <div>
                          <strong>{ingredient.chinese}</strong>
                          <small>{ingredient.name}</small>
                        </div>
                      </div>
                      <span className="tooltip-category">
                        主要作用 · {ingredient.category}
                      </span>
                      <p>{ingredient.role}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="selected-recipe">
            <div className="selected-recipe-heading">
              <span>已选辅料</span>
              <strong>{selectedIngredients.length} / 5</strong>
            </div>

            {selectedIngredients.length > 0 ? (
              <div className="amount-editor-list">
                {selectedIngredients.map((ingredient) => {
                  const selectedLevel =
                    ingredientAmounts[ingredient.id] ?? 'standard'

                  return (
                    <div className="amount-editor-row" key={ingredient.id}>
                      <div className="amount-editor-name">
                        <span>{ingredient.icon}</span>
                        <div>
                          <strong>{ingredient.chinese}</strong>
                          <small>{ingredient.name}</small>
                        </div>
                      </div>

                      <div className="amount-level-control">
                        {amountLevels.map((level) => (
                          <button
                            type="button"
                            key={level.id}
                            className={
                              selectedLevel === level.id ? 'active' : ''
                            }
                            onClick={() =>
                              setIngredientAmount(ingredient.id, level.id)
                            }
                          >
                            <strong>{level.chinese}</strong>
                            <small>{amountLabel(ingredient.id, level.id)}</small>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="amount-remove-button"
                        onClick={() => toggleIngredient(ingredient)}
                        aria-label={`移除${ingredient.chinese}`}
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="empty-selection">
                暂未添加辅料，点击上方材料卡片进行选择。
              </p>
            )}
          </div>

          <button
            className="primary-button"
            disabled={selectedIngredients.length === 0}
            onClick={() => {
              setActiveIngredientInfo(null)
              setPage('techniques')
            }}
          >
            下一步：选择工艺
          </button>
        </section>
      </main>
    )
  }

  if (page === 'classic-select') {
    return (
      <main className="app challenge-page-app">
        <section className="mixing-panel challenge-select-panel">
          <div className="top-bar">
            <button className="back-button" onClick={goHome}>← 返回首页</button>
            <span className="step-label">CLASSIC CHALLENGE</span>
          </div>

          <div className="section-heading challenge-page-heading">
            <p className="eyebrow">RECREATE A CLASSIC</p>
            <h2>选择你要复刻的经典酒</h2>
            <p>
              系统只提供风味线索，不直接公布完整答案。完成后将解锁标准配方和复刻报告。
            </p>
          </div>

          <div className="classic-challenge-grid">
            {cocktails.map((cocktail, index) => {
              const clues = getClassicClues(cocktail)

              return (
                <button
                  type="button"
                  key={cocktail.id}
                  className="classic-challenge-card"
                  onClick={() => {
                    setClassicTarget(cocktail)
                    resetRecipeSelection()
                    setPage('spirits')
                  }}
                >
                  <div className="challenge-card-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="challenge-card-top">
                    <span>{spirits.find((item) => item.id === cocktail.spirit)?.icon}</span>
                    <small>{getClassicDifficulty(cocktail)}</small>
                  </div>
                  <h3>{cocktail.chinese}</h3>
                  <strong>{cocktail.name}</strong>
                  <ul>
                    {clues.map((clue) => (
                      <li key={clue}>{clue}</li>
                    ))}
                  </ul>
                  <span className="challenge-card-action">接受挑战 →</span>
                </button>
              )
            })}
          </div>
        </section>
      </main>
    )
  }

  if (page === 'bartender-brief') {
    return (
      <main className="app challenge-page-app">
        <section className="mixing-panel bartender-brief-panel">
          <div className="top-bar">
            <button className="back-button" onClick={goHome}>← 返回首页</button>
            <span className="step-label">BARTENDER CHALLENGE</span>
          </div>

          <div className="bartender-brief-hero">
            <div className="bartender-challenge-icon">
              {activeBartenderChallenge.icon}
            </div>
            <p className="eyebrow">TODAY'S BARTENDER MISSION</p>
            <h2>{activeBartenderChallenge.title}</h2>
            <p>{activeBartenderChallenge.description}</p>
            <div className="challenge-difficulty-row">
              <span>难度 · {activeBartenderChallenge.difficulty}</span>
              <span>今日第 {bartenderChallengeIndex + 1} 号任务</span>
            </div>
          </div>

          <div className="bartender-rule-preview">
            <div className="bartender-rule-heading">
              <div>
                <small>MISSION RULES</small>
                <h3>任务条件</h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  setBartenderChallengeIndex((current) =>
                    (current + 1) % bartenderChallenges.length
                  )
                }
              >
                换一个随机挑战
              </button>
            </div>

            <div className="bartender-rule-chips">
              {activeBartenderChallenge.requiredSpirit && (
                <span>基酒：{spiritName(activeBartenderChallenge.requiredSpirit)}</span>
              )}
              {activeBartenderChallenge.requiredAny && (
                <span>
                  至少选择：
                  {activeBartenderChallenge.requiredAny
                    .filter((id) => ingredients.some((item) => item.id === id))
                    .map(ingredientName)
                    .join(' / ')}
                </span>
              )}
              {activeBartenderChallenge.requiredAll?.map((id) => (
                <span key={id}>必须加入：{ingredientName(id)}</span>
              ))}
              {activeBartenderChallenge.requireBubbles && <span>必须带气泡</span>}
              {activeBartenderChallenge.requiredTechnique && (
                <span>工艺：{techniqueName(activeBartenderChallenge.requiredTechnique)}</span>
              )}
              {activeBartenderChallenge.requiredGlass && (
                <span>
                  杯型：
                  {glasses.find((item) => item.id === activeBartenderChallenge.requiredGlass)?.chinese}
                </span>
              )}
              {activeBartenderChallenge.maxIngredients && (
                <span>辅料≤{activeBartenderChallenge.maxIngredients}种</span>
              )}
              {Object.entries(activeBartenderChallenge.flavorMin ?? {}).map(
                ([key, value]) => (
                  <span key={`min-${key}`}>
                    {flavorChineseMap[key]}≥{value}
                  </span>
                ),
              )}
              {Object.entries(activeBartenderChallenge.flavorMax ?? {}).map(
                ([key, value]) => (
                  <span key={`max-${key}`}>
                    {flavorChineseMap[key]}≤{value}
                  </span>
                ),
              )}
              {activeBartenderChallenge.customRule === 'sweetSourGap' && (
                <span>甜感与酸度差≤12</span>
              )}
              <span>创作评分≥{activeBartenderChallenge.minScore}</span>
            </div>
          </div>

          <button
            className="primary-button bartender-start-button"
            onClick={() => {
              resetRecipeSelection()
              setPage('spirits')
            }}
          >
            接受任务，开始调酒
          </button>
        </section>
      </main>
    )
  }

  if (page === 'spirits') {
    return (
      <main className="app">
        <section className="mixing-panel">
          <div className="top-bar">
            <button className="back-button" onClick={goHome}>← 返回</button>
            <span className="step-label">STEP 1 / 4</span>
          </div>

          <ModeBanner
            mode={gameMode}
            classicTarget={classicTarget}
            bartenderChallenge={activeBartenderChallenge}
          />

          <div className="section-heading">
            <p className="eyebrow">CHOOSE YOUR BASE</p>
            <h2>选择基酒</h2>
            <p>基酒决定鸡尾酒的主体风格。</p>
          </div>

          <div className="spirit-grid">
            {spirits.map((spirit) => (
              <button
                key={spirit.id}
                className={`spirit-card ${
                  selectedSpirit?.id === spirit.id ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedSpirit(spirit)
                  setSelectedTechnique(null)
                  setSelectedGlass(null)
                  setActiveGlassIndex(0)
                }}
              >
                <span className="spirit-icon">{spirit.icon}</span>
                <span className="spirit-name">
                  <strong>{spirit.name}</strong>
                  <small>{spirit.chinese}</small>
                </span>
                <span className="spirit-description">{spirit.description}</span>
              </button>
            ))}
          </div>

          <div className="selection-summary">
            {selectedSpirit ? (
              <>
                <span>当前选择</span>
                <strong>{selectedSpirit.name} · {selectedSpirit.chinese}</strong>
              </>
            ) : (
              <span>请选择一种基酒</span>
            )}
          </div>

          <button
            className="primary-button"
            disabled={!selectedSpirit}
            onClick={() => setPage('ingredients')}
          >
            下一步：添加辅料
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app v14-home-app">
      <section className="hero v14-home-hero">
        <div className="glass-icon">🍸</div>
        <p className="eyebrow">COCKTAIL DISCOVERY GAME</p>
        <h1>Cocktail Odyssey</h1>
        <p className="subtitle">
          选择你今天的调酒方式：自由探索、复刻经典，或者接受酒保任务。
        </p>

        <div className="game-mode-grid">
          <button
            type="button"
            className="game-mode-card free-mode-card"
            onClick={() => startMode('free')}
          >
            <span className="mode-card-icon">🥃</span>
            <small>FREE CREATION</small>
            <h2>自由创作</h2>
            <p>没有标准答案，随心搭配，调出只属于你的作品。</p>
            <strong>开始自由调酒 →</strong>
          </button>

          <button
            type="button"
            className="game-mode-card classic-mode-card"
            onClick={() => startMode('classic')}
          >
            <span className="mode-card-icon">📜</span>
            <small>CLASSIC CHALLENGE</small>
            <h2>经典挑战</h2>
            <p>凭风味线索复刻 12 杯世界经典鸡尾酒。</p>
            <strong>选择经典酒 →</strong>
          </button>

          <button
            type="button"
            className="game-mode-card bartender-mode-card"
            onClick={() => startMode('bartender')}
          >
            <span className="mode-card-icon">🎯</span>
            <small>DAILY BARTENDER</small>
            <h2>酒保挑战</h2>
            <p>接受限定条件，在规则之内完成今天的任务。</p>
            <strong>查看今日挑战 →</strong>
          </button>
        </div>

        <button className="secondary-button v14-gallery-button">
          查看我的图鉴
        </button>

        <div className="progress-card v14-progress-card">
          <span>原创作品收藏</span>
          <strong>{collection.length} 杯</strong>
        </div>
      </section>
    </main>
  )
}

export default App
