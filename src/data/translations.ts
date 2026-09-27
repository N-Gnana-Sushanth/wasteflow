import { LanguageCode } from '../types';

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // App branding
    app_name: 'WasteFlow',
    app_tagline: 'AI-Assisted Smart Waste Collection & Circular Platform',
    role_citizen: 'Citizen Portal',
    role_admin: 'Municipal Command Center',
    role_driver: 'Collection Driver Suite',
    role_facility: 'Recycling Facility Hub',
    
    // Navigation
    nav_home: 'Overview',
    nav_scanner: 'AI Waste Scanner',
    nav_pickups: 'Pickup Requests',
    nav_tracking: 'Live Truck Tracking',
    nav_rewards: 'Rewards & Eco-Rank',
    nav_dumping: 'Illegal Dumping Reports',
    nav_centers: 'Recycling Centers',
    nav_assistant: 'AI Assistant',
    nav_map: 'GIS Command Map',
    nav_bins: 'Smart Bin IoT Center',
    nav_routes: 'Route Optimization',
    nav_whatif: 'What-If Simulator',
    nav_analytics: 'Municipal Analytics',
    nav_incidents: 'Incident Hub',
    nav_marketplace: 'Circular Marketplace',
    nav_driver_route: "Today's Route",
    nav_driver_manifest: 'Manifest Stops',
    nav_driver_health: 'Vehicle Health',
    nav_facility_inflow: 'Material Inflow',
    nav_facility_flow: 'Circular Flow',
    nav_admin_settings: 'System Administration',
    nav_audit_logs: 'Audit Logs',
    
    // Actions
    btn_scan_waste: 'Scan Waste with AI',
    btn_request_pickup: 'Schedule Smart Pickup',
    btn_report_dumping: 'Report Illegal Dumping',
    btn_optimize_routes: 'OPTIMIZE CITY COLLECTION',
    btn_run_scenario: 'Simulate Scenario Impact',
    btn_verify_otp: 'Verify OTP / QR',
    btn_arrived: 'Mark Arrived',
    btn_collect: 'Confirm Collection',
    btn_showcase: 'Guided Hackathon Tour',
    btn_switch_role: 'Switch Role',
    
    // Common metrics
    kpi_total_bins: 'Total Smart Bins',
    kpi_critical_bins: 'Critical Overflows',
    kpi_active_trucks: 'Active Vehicles',
    kpi_pending_pickups: 'Pending Pickups',
    kpi_landfill_diverted: 'Landfill Diverted',
    kpi_co2_saved: 'CO₂ Reduced',
    kpi_recycling_rate: 'Recycling Rate',
    kpi_sla_compliance: 'SLA Compliance',
    
    // Waste Categories
    cat_wet: 'Wet / Organic',
    cat_dry: 'Dry / Recyclable',
    cat_plastic: 'Plastics & Polymers',
    cat_paper: 'Paper & Cardboard',
    cat_glass: 'Glass & Bottles',
    cat_metal: 'Metal & Scraps',
    cat_ewaste: 'E-Waste / Electronics',
    cat_hazardous: 'Hazardous / Chemical',
    cat_mixed: 'Mixed Waste',
    
    // Search
    search_placeholder: 'Search Bin ID, Truck, Pickup #, Zone, Incident...',
    all_zones: 'All Zones',
    all_categories: 'All Categories',
    all_statuses: 'All Statuses',

    // Simulation
    sim_mode: 'Realtime IoT Simulation Active',
    sim_speed: 'Tick Rate',
    demo_badge: 'Simulated Data & AI Neural Engine',
  },
  
  te: {
    // App branding
    app_name: 'వేస్ట్‌ఫ్లో (WasteFlow)',
    app_tagline: 'AI-ఆధారిత స్మార్ట్ వ్యర్థ సేకరణ & రీసైక్లింగ్ ప్లాట్‌ఫారమ్',
    role_citizen: 'పౌరుల పోర్టల్ (Citizen)',
    role_admin: 'మున్సిపల్ కమాండ్ సెంటర్ (Admin)',
    role_driver: 'డ్రైవర్ యాప్ (Driver)',
    role_facility: 'రీసైక్లింగ్ కేంద్రం (Facility)',
    
    // Navigation
    nav_home: 'ప్రధాన వివరాలు',
    nav_scanner: 'AI వ్యర్థ స్కానర్',
    nav_pickups: 'పికప్ అభ్యర్థనలు',
    nav_tracking: 'వాహన లైవ్ ట్రాకింగ్',
    nav_rewards: 'రివార్డులు & ర్యాంక్',
    nav_dumping: 'చట్టవిరుద్ధ డంపింగ్ ఫిర్యాదు',
    nav_centers: 'రీసైక్లింగ్ కేంద్రాలు',
    nav_assistant: 'AI సహాయకుడు',
    nav_map: 'నగర GIS మ్యాప్',
    nav_bins: 'స్మార్ట్ బిన్ IoT',
    nav_routes: 'రూట్ ఆప్టిమైజేషన్',
    nav_whatif: 'పరిస్థితుల సిమ్యులేటర్',
    nav_analytics: 'విశ్లేషణలు & గణాంకాలు',
    nav_incidents: 'సమస్యల నివేదికలు',
    nav_marketplace: 'రీసైకిల్ మార్కెట్‌ప్లేస్',
    nav_driver_route: 'నేటి సేకరణ రూట్',
    nav_driver_manifest: 'స్టాప్స్ జాబితా',
    nav_driver_health: 'వాహన స్థితి',
    nav_facility_inflow: 'వ్యర్థాల ప్రాసెసింగ్',
    nav_facility_flow: 'సర్క్యులర్ ఎకానమీ',
    nav_admin_settings: 'సిస్టమ్ సెట్టింగ్స్',
    nav_audit_logs: 'ఆడిట్ లాగ్స్',
    
    // Actions
    btn_scan_waste: 'AI తో చెత్తను స్కాన్ చేయండి',
    btn_request_pickup: 'స్మార్ట్ పికప్ షెడ్యూల్ చేయండి',
    btn_report_dumping: 'డంపింగ్ ఫిర్యాదు చేయండి',
    btn_optimize_routes: 'నగర సేకరణను ఆప్టిమైజ్ చేయండి',
    btn_run_scenario: 'పరిస్థితిని పరీక్షించండి',
    btn_verify_otp: 'OTP / QR ధృవీకరించండి',
    btn_arrived: 'చేరుకున్నాము',
    btn_collect: 'సేకరణ పూర్తయింది',
    btn_showcase: 'హ్యాకథాన్ గైడెడ్ టూర్',
    btn_switch_role: 'పాత్రను మార్చండి',
    
    // Common metrics
    kpi_total_bins: 'మొత్తం స్మార్ట్ డస్ట్‌బిన్లు',
    kpi_critical_bins: 'నిండిపోయిన బిన్లు',
    kpi_active_trucks: 'సేకరణ వాహనాలు',
    kpi_pending_pickups: 'పెండింగ్ పికప్‌లు',
    kpi_landfill_diverted: 'ల్యాండ్‌ఫిల్ రహిత వ్యర్థాలు',
    kpi_co2_saved: 'తగ్గించిన కార్బన్ (CO₂)',
    kpi_recycling_rate: 'రీసైక్లింగ్ శాతం',
    kpi_sla_compliance: 'SLA నిబంధనల పాటించటం',
    
    // Waste Categories
    cat_wet: 'తడి / సేంద్రీయ వ్యర్థాలు',
    cat_dry: 'పొడి / పునర్వినియోగ వ్యర్థాలు',
    cat_plastic: 'ప్లాస్టిక్ & కవర్లు',
    cat_paper: 'కాగితం & కార్డ్‌బోర్డ్',
    cat_glass: 'గాజు & సీసాలు',
    cat_metal: 'లోహాలు & స్క్రాప్',
    cat_ewaste: 'ఈ-వ్యర్థాలు (ఎలక్ట్రానిక్స్)',
    cat_hazardous: 'ప్రమాదకర వ్యర్థాలు',
    cat_mixed: 'మిశ్రమ వ్యర్థాలు',
    
    // Search
    search_placeholder: 'బిన్ ID, వాహనం, పికప్ #, జోన్ వెతకండి...',
    all_zones: 'అన్ని జోన్లు',
    all_categories: 'అన్ని రకాలు',
    all_statuses: 'అన్ని స్థితులు',

    // Simulation
    sim_mode: 'రియల్ టైమ్ IoT సిమ్యులేషన్ ఆన్‌లో ఉంది',
    sim_speed: 'సిమ్యులేషన్ వేగం',
    demo_badge: 'సిమ్యులేటెడ్ డేటా & AI న్యూరల్ ఇంజిన్',
  },
  
  hi: {
    // App branding
    app_name: 'वेस्टफ्लो (WasteFlow)',
    app_tagline: 'एआई-संचालित स्मार्ट कचरा संग्रह एवं सर्कुलर प्रबंधन प्लेटफॉर्म',
    role_citizen: 'नागरिक पोर्टल (Citizen)',
    role_admin: 'नगर निगम कमांड सेंटर (Admin)',
    role_driver: 'संग्रहण चालक सूट (Driver)',
    role_facility: 'पुनर्चक्रण संयंत्र केंद्र (Facility)',
    
    // Navigation
    nav_home: 'अवलोकन',
    nav_scanner: 'एआई कचरा स्कैनर',
    nav_pickups: 'पिकअप अनुरोध',
    nav_tracking: 'वाहन लाइव ट्रैकिंग',
    nav_rewards: 'इनाम एवं रैंकिंग',
    nav_dumping: 'अवैध डंपिंग रिपोर्ट',
    nav_centers: 'पुनर्चक्रण केंद्र',
    nav_assistant: 'एआई सहायक',
    nav_map: 'जीआईएस कमांड मैप',
    nav_bins: 'स्मार्ट डस्टबिन आईओटी',
    nav_routes: 'रूट अनुकूलन',
    nav_whatif: 'परिदृश्य सिम्युलेटर',
    nav_analytics: 'नगर निगम विश्लेषण',
    nav_incidents: 'घटना प्रबंधन',
    nav_marketplace: 'सर्कुलर मार्केटप्लेस',
    nav_driver_route: 'आज का रूट',
    nav_driver_manifest: 'संग्रह स्टॉप सूची',
    nav_driver_health: 'वाहन स्वास्थ्य',
    nav_facility_inflow: 'अपशिष्ट प्रसंस्करण',
    nav_facility_flow: 'सर्कुलर प्रवाह',
    nav_admin_settings: 'सिस्टम सेटिंग्स',
    nav_audit_logs: 'ऑडिट लॉग्स',
    
    // Actions
    btn_scan_waste: 'एआई से कचरा स्कैन करें',
    btn_request_pickup: 'स्मार्ट पिकअप शेड्यूल करें',
    btn_report_dumping: 'अवैध डंपिंग की शिकायत करें',
    btn_optimize_routes: 'शहर का संग्रहण अनुकूलित करें',
    btn_run_scenario: 'परिदृश्य प्रभाव का परीक्षण करें',
    btn_verify_otp: 'ओटीपी / क्यूआर सत्यापित करें',
    btn_arrived: 'पहुंच गए',
    btn_collect: 'संग्रहण पूर्ण',
    btn_showcase: 'हैकाथॉन निर्देशित टूर',
    btn_switch_role: 'रोल बदलें',
    
    // Common metrics
    kpi_total_bins: 'कुल स्मार्ट डस्टबिन',
    kpi_critical_bins: 'गंभीर रूप से भरे बिन',
    kpi_active_trucks: 'सक्रिय संग्रहण वाहन',
    kpi_pending_pickups: 'लंबित पिकअप',
    kpi_landfill_diverted: 'लैंडफिल से बचाया कचरा',
    kpi_co2_saved: 'कम किया गया CO₂',
    kpi_recycling_rate: 'पुनर्चक्रण दर',
    kpi_sla_compliance: 'एसएलए अनुपालन',
    
    // Waste Categories
    cat_wet: 'गीला / जैविक कचरा',
    cat_dry: 'सूखा / पुनर्चक्रण योग्य',
    cat_plastic: 'प्लास्टिक एवं पॉलिमर',
    cat_paper: 'कागज एवं गत्ता',
    cat_glass: 'कांच एवं बोतलें',
    cat_metal: 'धातु एवं स्क्रैप',
    cat_ewaste: 'ई-कचरा / इलेक्ट्रॉनिक्स',
    cat_hazardous: 'खतरनाक / रासायनिक',
    cat_mixed: 'मिश्रित कचरा',
    
    // Search
    search_placeholder: 'डस्टबिन आईडी, वाहन, पिकअप #, जोन खोजें...',
    all_zones: 'सभी जोन',
    all_categories: 'सभी श्रेणियां',
    all_statuses: 'सभी स्थितियां',

    // Simulation
    sim_mode: 'रियल-टाइम आईओटी सिमुलेशन सक्रिय',
    sim_speed: 'सिमुलेशन गति',
    demo_badge: 'सिम्युलेटेड डेटा एवं एआई न्यूरल इंजन',
  }
};
