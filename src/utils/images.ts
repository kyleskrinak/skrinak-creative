/**
 * Image Import Utilities
 *
 * Provides optimized image imports for Astro Image component.
 * All images are automatically converted to WebP with fallbacks.
 */

// Banner images
import bannerHome from '../assets/images/Banner.png';
import bannerInner from '../assets/images/Banner_thinner.png';
import logo from '../assets/images/logo.png';

// Brochures
import brochures2015TakeAway from '../assets/images/2015_TakeAway.png';
import brochuresAerospace from '../assets/images/Aerospace_bro.png';
import brochuresBaseCamp from '../assets/images/BaseCamp_bro.png';
import brochuresDRAKA from '../assets/images/DRAKAbro.png';
import brochuresElite from '../assets/images/Elite_brochure.png';
import brochuresHealthcare from '../assets/images/Healthcare_bro.png';
import brochuresMagnacet from '../assets/images/Magnacet_bro.png';
import brochuresNCSmall from '../assets/images/NCsmall.png';
import brochuresPNI from '../assets/images/PNI_brochure.png';
import brochuresPeace from '../assets/images/Peacebro.png';
import brochuresPeaceCamp from '../assets/images/Peacecamp.png';
import brochuresRxStudy from '../assets/images/RxStudy_Card_brochure.png';
import brochuresSEW from '../assets/images/SEW.png';
import brochuresStyleGuide from '../assets/images/STYLE_GUIDE.png';
import brochuresENCBiennial from '../assets/images/e-NC_BiennaI.png';
import brochuresENC2 from '../assets/images/e-nc2.png';
import brochuresGateway from '../assets/images/gateway.png';

// Folders
import foldersCC from '../assets/images/CCfolder.png';
import foldersGSS from '../assets/images/GSS.png';
import foldersHM from '../assets/images/H&M.png';
import foldersKPC from '../assets/images/KPC.png';
import foldersManufacturing from '../assets/images/Manufacturing_bro.png';
import foldersENC from '../assets/images/e-NC.png';

// Logos
import logos2020 from '../assets/images/2020.png';
import logosCC from '../assets/images/CClogo.png';
import logosCOE from '../assets/images/COE_logo.png';
import logosGSS from '../assets/images/GSS.png';
import logosKM from '../assets/images/KM_cleaned.png';
import logosInteract from '../assets/images/interact_cleaned.png';
import logosWMT from '../assets/images/wmtlogo.png';

// Newsletters
import newslettersDRAKABulletins from '../assets/images/DRAKAbulletins.png';
import newslettersDRAKANews from '../assets/images/DRAKAnews.png';
import newslettersEvokat from '../assets/images/Evokat_sellsheet.png';
import newslettersHIV from '../assets/images/HIV_sellsheet_v2.png';
import newslettersHfH from '../assets/images/HfHnews.png';
import newslettersHomeowner from '../assets/images/HomeownerHapps.png';

// Trade Show
import tradeShowBIO from '../assets/images/17-133_CA-BIO2017_Samulski-24x36_P3_withmap.png';
import tradeShowPanel from '../assets/images/2017_tradeshow_panel.png';
import tradeShowDRAKAPanel from '../assets/images/DRAKA_TS_Panels.png';
import tradeShowDRAKATrade from '../assets/images/DRAKAtrade.png';
import tradeShowIMG from '../assets/images/IMG_0030.png';
import tradeShowMoodle from '../assets/images/MoodleMoot_Poster.png';
import tradeShowOffice from '../assets/images/Office_posters.png';
import tradeShowPlexus from '../assets/images/Plexus_wheel_OUTLINE.png';
import tradeShowVictory from '../assets/images/VICTORYtrade.png';

export const images = {
  // Navigation
  bannerHome,
  bannerInner,
  logo,

  // Brochures
  brochures: [
    { src: brochures2015TakeAway, alt: '2015 Take Away' },
    { src: brochuresAerospace, alt: 'Aerospace Brochure' },
    { src: brochuresBaseCamp, alt: 'BaseCamp Brochure' },
    { src: brochuresDRAKA, alt: 'DRAKA Brochure' },
    { src: brochuresElite, alt: 'Elite Brochure' },
    { src: brochuresHealthcare, alt: 'Healthcare Brochure' },
    { src: brochuresMagnacet, alt: 'Magnacet Brochure' },
    { src: brochuresNCSmall, alt: 'NC Small Brochure' },
    { src: brochuresPNI, alt: 'PNI Brochure' },
    { src: brochuresPeace, alt: 'Peace Brochure' },
    { src: brochuresPeaceCamp, alt: 'Peace Camp Brochure' },
    { src: brochuresRxStudy, alt: 'RxStudy Card Brochure' },
    { src: brochuresSEW, alt: 'SEW Brochure' },
    { src: brochuresStyleGuide, alt: 'Style Guide' },
    { src: brochuresENCBiennial, alt: 'e-NC Biennial' },
    { src: brochuresENC2, alt: 'e-NC 2' },
    { src: brochuresGateway, alt: 'Gateway' },
  ],

  // Folders
  folders: [
    { src: foldersCC, alt: 'CC Folder' },
    { src: foldersGSS, alt: 'GSS Folder' },
    { src: foldersHM, alt: 'H&M Folder' },
    { src: foldersKPC, alt: 'KPC Folder' },
    { src: foldersManufacturing, alt: 'Manufacturing Folder' },
    { src: foldersENC, alt: 'e-NC Folder' },
  ],

  // Logos
  logos: [
    { src: logos2020, alt: '2020 Logo' },
    { src: logosCC, alt: 'CC Logo' },
    { src: logosCOE, alt: 'COE Logo' },
    { src: logosGSS, alt: 'GSS Logo' },
    { src: logosKM, alt: 'KM Logo' },
    { src: logosInteract, alt: 'Interact Logo' },
    { src: logosWMT, alt: 'WMT Logo' },
  ],

  // Newsletters
  newsletters: [
    { src: newslettersDRAKABulletins, alt: 'DRAKA Bulletins' },
    { src: newslettersDRAKANews, alt: 'DRAKA News' },
    { src: newslettersEvokat, alt: 'Evokat Sell Sheet' },
    { src: newslettersHIV, alt: 'HIV Sell Sheet' },
    { src: newslettersHfH, alt: 'HfH News' },
    { src: newslettersHomeowner, alt: 'Homeowner Happs' },
  ],

  // Trade Show
  tradeShow: [
    { src: tradeShowBIO, alt: 'BIO 2017' },
    { src: tradeShowPanel, alt: '2017 Trade Show Panel' },
    { src: tradeShowDRAKAPanel, alt: 'DRAKA Trade Show Panel' },
    { src: tradeShowDRAKATrade, alt: 'DRAKA Trade Show' },
    { src: tradeShowIMG, alt: 'Trade Show Image' },
    { src: tradeShowMoodle, alt: 'Moodle Moot Poster' },
    { src: tradeShowOffice, alt: 'Office Posters' },
    { src: tradeShowPlexus, alt: 'Plexus Wheel' },
    { src: tradeShowVictory, alt: 'Victory Trade Show' },
  ],
};
