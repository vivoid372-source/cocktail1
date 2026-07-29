const spiritDescriptions = {
  gin: 'a crystal-clear gin base with subtle cool botanical highlights',
  vodka: 'a clean nearly colorless vodka base',
  rum: 'a pale gold rum base with warm sugarcane highlights',
  tequila: 'a light golden tequila base with natural agave warmth',
  whisky: 'a rich amber whisky base with warm oak reflections',
  brandy: 'a deep golden-amber brandy base with subtle reddish warmth',
}

const glassDescriptions = {
  highball:
    'a tall, physically accurate transparent highball glass with realistic thick glass base',
  'old-fashioned':
    'a heavy low rocks glass with a thick clear glass base',
  martini:
    'an elegant V-shaped martini glass with a thin realistic stem',
  coupe:
    'a refined shallow coupe glass with a thin realistic stem',
}

const techniqueDescriptions = {
  shake:
    'freshly shaken and properly chilled, with slight natural aeration and realistic dilution',
  stir:
    'stirred until crystal clear, cold and polished, with no unnecessary foam',
  build:
    'built directly in the serving glass with natural ingredient layering',
}

const visualRules = {
  cola: {
    color:
      'deep translucent cola-brown, almost black in the center but warm amber at the illuminated edges',
    texture: 'visible fine carbonation and a very subtle tan foam line',
  },
  'cranberry-juice': {
    color: 'natural cranberry ruby-pink to muted berry red',
    texture: 'slightly cloudy fruit-juice body',
  },
  grenadine: {
    color:
      'a natural deep ruby-red concentration near the bottom, blending upward into the drink',
    texture: 'a believable soft gradient, never neon',
  },
  campari: {
    color: 'transparent ruby red with orange-red highlights',
    texture: 'clear bitter aperitif body',
  },
  'orange-juice': {
    color: 'natural orange-gold',
    texture: 'realistically cloudy fresh orange juice texture',
  },
  'lemon-juice': {
    color: 'pale natural lemon-gold',
    texture: 'slightly cloudy fresh citrus texture',
  },
  'lime-juice': {
    color: 'very pale natural yellow-green, not bright green',
    texture: 'slightly cloudy fresh lime texture',
  },
  mint: {
    garnish: 'a small realistic fresh mint sprig',
    detail: 'a very subtle green botanical cast, never neon green',
  },
  'soda-water': {
    texture: 'fine active carbonation with small realistic rising bubbles',
  },
  'tonic-water': {
    texture: 'fine tonic carbonation with a transparent body',
  },
  'ginger-beer': {
    color: 'pale warm straw-gold',
    texture: 'active carbonation with a faint natural ginger haze',
  },
  'egg-white': {
    texture:
      'a smooth dense ivory foam cap with very fine bubbles, professionally shaken',
  },
  cream: {
    color: 'opaque warm cream to light café-au-lait',
    texture: 'silky, thick and fully opaque dairy texture',
  },
  'cacao-liqueur': {
    color: 'rich milk-chocolate brown',
    texture: 'smooth dessert-cocktail body',
  },
  'sweet-vermouth': {
    color: 'warm amber-red wine tone',
    detail: 'subtle herbal-spice reflections',
  },
  'dry-vermouth': {
    color: 'very pale straw-gold and highly transparent',
    detail: 'clean dry wine-like clarity',
  },
  'aromatic-bitters': {
    color: 'slightly deeper amber',
    detail: 'subtle warm spice character',
  },
  'triple-sec': {
    color: 'soft orange-gold highlights',
    detail: 'natural orange-peel character',
  },
  'sugar-syrup': {
    detail: 'slightly rounder light refraction without looking thick',
  },
  'honey-syrup': {
    color: 'warm honey-gold highlights',
    texture: 'a slightly richer natural body',
  },
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function buildVisualRecipe(payload) {
  const ingredients = Array.isArray(payload.ingredients)
    ? payload.ingredients
    : []
  const ids = ingredients.map((item) => item.id)

  const colors = []
  const textures = []
  const details = []
  const garnishes = []

  ingredients.forEach((ingredient) => {
    const rule = visualRules[ingredient.id]
    if (!rule) return

    colors.push(rule.color)
    textures.push(rule.texture)
    details.push(rule.detail)
    garnishes.push(rule.garnish)
  })

  let garnish = unique(garnishes)[0]

  if (!garnish) {
    if (ids.includes('lime-juice')) {
      garnish = 'one small realistic lime wheel or lime wedge'
    } else if (ids.includes('lemon-juice')) {
      garnish = 'one thin realistic lemon peel or small lemon wedge'
    } else if (
      ids.includes('orange-juice') ||
      ids.includes('triple-sec') ||
      payload.spirit?.id === 'whisky'
    ) {
      garnish = 'one thin natural orange peel'
    } else if (ids.includes('cranberry-juice') || ids.includes('grenadine')) {
      garnish = 'one restrained cocktail cherry'
    } else if (ids.includes('dry-vermouth')) {
      garnish = 'one realistic green cocktail olive'
    } else {
      garnish = 'minimal professional garnish appropriate for an upscale cocktail bar'
    }
  }

  const hasBubbles = ids.some((id) =>
    ['soda-water', 'tonic-water', 'cola', 'ginger-beer'].includes(id),
  )
  const hasFoam = ids.includes('egg-white')
  const isCreamy = ids.includes('cream') || ids.includes('cacao-liqueur')
  const isHighball = payload.glass?.id === 'highball'
  const isRocks = payload.glass?.id === 'old-fashioned'
  const isStemmed = ['martini', 'coupe'].includes(payload.glass?.id)

  let ice = 'no visible ice, served properly chilled'
  if (isHighball) {
    ice = 'several clear realistic ice cubes reaching through the drink'
  } else if (isRocks) {
    ice = 'one large clear hand-cut ice cube'
  }

  if (isStemmed) {
    ice = 'no ice in the final serving glass'
  }

  return {
    base:
      spiritDescriptions[payload.spirit?.id] ||
      'a realistic premium spirit base',
    glass:
      glassDescriptions[payload.glass?.id] ||
      'a physically accurate transparent cocktail glass',
    technique:
      techniqueDescriptions[payload.technique?.id] ||
      'professionally prepared and properly chilled',
    color:
      unique(colors).join('; ') ||
      payload.appearance?.note ||
      'natural warm golden cocktail color',
    texture:
      unique(textures).join('; ') ||
      'realistic translucent cocktail liquid',
    details: unique(details).join('; '),
    garnish,
    ice,
    condensation:
      isCreamy
        ? 'subtle realistic chill on the outside of the glass'
        : 'fine natural condensation droplets on the outer glass surface',
    bubbles: hasBubbles
      ? 'small physically realistic bubbles visible through the liquid'
      : 'no artificial bubbles',
    foam: hasFoam
      ? 'a refined dense foam cap with micro-bubbles'
      : 'no unnecessary foam',
  }
}

function buildPrompt(payload) {
  const visual = buildVisualRecipe(payload)
  const ingredientNames = (payload.ingredients || [])
    .map((item) => `${item.name || item.chinese} (${item.amountLabel || item.amount})`)
    .join(', ')

  return `
Create one single photorealistic editorial beverage photograph of an original cocktail named "${payload.drinkName || 'Original Cocktail'}".

The drink is based on ${visual.base}.
Ingredients informing the appearance: ${ingredientNames || 'the selected cocktail ingredients'}.
Serve it in ${visual.glass}.
Preparation appearance: ${visual.technique}.

LIQUID APPEARANCE:
- Color: ${visual.color}.
- Texture and opacity: ${visual.texture}.
- Additional visual detail: ${visual.details || 'natural realistic liquid refraction'}.
- Carbonation: ${visual.bubbles}.
- Foam: ${visual.foam}.
- Ice: ${visual.ice}.
- Garnish: ${visual.garnish}.
- Glass surface: ${visual.condensation}.

SCENE:
Place exactly one finished cocktail on a polished dark wooden bar counter inside an upscale intimate cocktail bar.
Warm amber practical lighting, softly blurred liquor bottles and golden bokeh in the background.
Shallow depth of field, realistic 85mm commercial beverage photography, natural cinematic lighting.
Accurate glass refraction, realistic liquid transparency or cloudiness, physically plausible ice and garnish.
Premium bar-menu photography, sophisticated, restrained and believable.

COMPOSITION:
Portrait-oriented hero photograph, the whole glass clearly visible and centered.
No people, no hands, no bartender, no extra drinks.
No text, no lettering, no logo, no label, no watermark.

STRICT STYLE EXCLUSIONS:
No illustration, no cartoon, no anime, no vector art, no emoji, no flat design.
No 3D render, no CGI appearance, no plastic-looking glass, no game art.
No exaggerated garnish, no impossible glass shape, no fluorescent neon liquid.
The result must look like a real cocktail photographed in a real bar.
`.trim()
}

export const config = {
  maxDuration: 60,
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: '只支持 POST 请求。' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(500).json({
      error: '服务器尚未配置 OPENAI_API_KEY。',
    })
  }

  try {
    const prompt = buildPrompt(request.body || {})

    const openaiResponse = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-2',
          prompt,
          size: '1024x1536',
          quality: 'medium',
          n: 1,
        }),
      },
    )

    const data = await openaiResponse.json()

    if (!openaiResponse.ok) {
      console.error('OpenAI image error:', data)
      return response.status(openaiResponse.status).json({
        error:
          data?.error?.message ||
          'OpenAI 图片生成接口调用失败。',
      })
    }

    const base64Image = data?.data?.[0]?.b64_json

    if (!base64Image) {
      return response.status(502).json({
        error: '图片接口没有返回有效的图片数据。',
      })
    }

    return response.status(200).json({
      imageUrl: `data:image/png;base64,${base64Image}`,
      promptVersion: 'cocktail-photo-v12',
    })
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : '生成图片时发生未知错误。',
    })
  }
}
