(function () {
  const reqUrl = (typeof $request !== "undefined" && $request.url) ? $request.url : "";
  const isRC = /firebaseremoteconfig\.googleapis\.com/i.test(reqUrl);
  const isRevenue = /api\.revenuecat\.com/i.test(reqUrl);
  const isLocketApi = /api\.locket\.com/i.test(reqUrl);

  const FEATURE_KEYS = [
    "photobooth", "photobooth_capture", "photobooth_gallery",
    "photobooth_filters", "photobooth_stickers",
    "ai_sticker", "ai_sticker_generate", "ai_sticker_unlimited",
    "ai_effects", "ai_filters", "ai_filter",
    "ai_avatar", "ai_avatar_generate",
    "ar_filters", "face_filters",
    "holiday_effects", "holiday_filters", "holiday_filter",
    "camera_roll", "camera_roll_video", "camera_roll_video_30s",
    "camera_roll_video_upload", "camera_roll_video_upload_30s",
    "camera_roll_longer_video", "camera_roll_longer_video_30s",
    "camera_filter", "camera_filters", "camera_filter_sheet",
    "camera_theme", "photo_filters", "filters", "filter",
    "longer_video", "longer_video_30s", "extended_video_30s",
    "video", "video_15s", "video_30s", "video_40s", "video_60s",
    "video_upload", "video_upload_30s",
    "photo_library_video", "photo_library_video_30s",
    "gallery_video", "gallery_video_30s",
    "can_upload_30s_video", "can_record_30s_video",
    "allow_longer_video_upload", "longer_video_upload",
    "profile_cover", "profile_cover_photo", "profile_customization",
    "app_icon_picker", "custom_widget_frames",
    "streak_recovery", "streakRecovery", "streak", "streaks",
    "streak_visualizations", "streak_badge",
    "unlimited_friends", "locket_views", "long_captions",
    "groups", "private_mode", "viewer_mode", "close_friends",
    "remove_ads", "priority_support",
    "profile_badge", "profileBadge",
    "gold_since_badge", "goldSinceBadge", "gold_badge_profile_menu"
  ];

  const FEATURE_GATES = {};
  for (let i = 0; i < FEATURE_KEYS.length; i++) {
    FEATURE_GATES[FEATURE_KEYS[i]] = "enabled";
  }

  const UPSELL = {};
  for (let i = 0; i < FEATURE_KEYS.length; i++) {
    UPSELL[FEATURE_KEYS[i]] = false;
  }

  const PAYWALL = {
    uid: "locket_gold",
    onboarding: false,
    after_sent_moment: false,
    after_moment: false,
    after_capture: false,
    on_foreground: false,
    holiday_effects: false,
    camera_filters: false,
    camera_filter: false,
    filters: false,
    filter: false,
    ai_filter: false,
    ai_filters: false,
    photobooth: false,
    filtered_image: false,
    filtered_images: false,
    generate_filtered_image: false,
    interval: 0,
    profile_banner: true
  };

  const DISCOVERY_POPUP = {
    tag: "LOCKET GOLD",
    tag_gradient: true,
    tag_style: "gold_gradient",
    title: "Lên LocketGold rồi đó 🤫 😎",
    feature_set: [{
      title: "Nhớ follow tiktok @tz4427 ✨",
      body: "Một follow của bạn, một niềm vui của mình 💛",
      imageURL: "https://i.ibb.co/Vc98ms12/2a-Obo-R6m581-AU5h4g-IHMLo8f-Edi-Q4j-Uq-EIXedb-Jg.png"
    }],
    primary_button_title: "Xong",
    campaign: "locket_gold_welcome_v3",
    start_at: "2020-01-01T00:00:00",
    end_at: "2099-12-31T23:59:59",
    use_local_time_zone: true
  };

  if (isRevenue && typeof $response !== "undefined" && typeof $response.body === "string") {
    let obj = {};
    try { obj = JSON.parse($response.body); } catch (e) { obj = {}; }
    if (!obj || typeof obj !== "object") obj = {};

    if (!obj.subscriber) obj.subscriber = {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};
    obj.subscriber.entitlements.gold = {
      expires_date: "2099-12-31T23:59:59Z",
      purchase_date: "2020-01-01T00:00:00Z",
      product_identifier: "locket_gold_monthly",
      is_active: true
    };
    obj.subscriber.entitlements.premium = obj.subscriber.entitlements.gold;
    obj.subscriber.entitlements.pro = obj.subscriber.entitlements.gold;
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
    obj.subscriber.subscriptions["locket_gold_monthly"] = {
      expires_date: "2099-12-31T23:59:59Z",
      purchase_date: "2020-01-01T00:00:00Z",
      original_purchase_date: "2020-01-01T00:00:00Z",
      store: "app_store",
      is_active: true,
      will_renew: true
    };
    obj.subscriber.original_app_user_id = "locket_gold_user";
    obj.subscriber.first_seen = "2020-01-01T00:00:00Z";
    obj.subscriber.management_url = null;

    $done({ body: JSON.stringify(obj) });
    return;
  }

  if (isRC && typeof $response !== "undefined" && typeof $response.body === "string") {
    let obj = {};
    try { obj = JSON.parse($response.body); } catch (e) { obj = {}; }
    if (!obj || typeof obj !== "object") obj = {};

    obj.state = "active";
    obj.timestamp = String(Date.now());
    obj.message = "Lên LocketGold rồi đó bạn!";

    if (!obj.entries) obj.entries = {};

    obj.entries.feature_gates = JSON.stringify(FEATURE_GATES);
    obj.entries.upsell_features = JSON.stringify(UPSELL);
    obj.entries.paywall_presentation_config = JSON.stringify(PAYWALL);
    obj.entries.feature_discovery_popup_config = JSON.stringify(DISCOVERY_POPUP);

    obj.entries.is_gold = "true";
    obj.entries.has_gold = "true";
    obj.entries.is_gold_user = "true";
    obj.entries.user_is_gold = "true";
    obj.entries.gold_user = "true";
    obj.entries.gold_active = "true";
    obj.entries.gold_tier = "gold";
    obj.entries.gold_subscription_status = "active";
    obj.entries.all_filters_free = "true";
    obj.entries.unlocked_filters = "true";
    obj.entries.camera_filter_max_count = "50";
    obj.entries.max_camera_filters = "50";

    obj.entries.photobooth_enabled = "true";
    obj.entries.photobooth_unlocked = "true";
    obj.entries.photobooth_gold_only = "false";
    obj.entries.photobooth_requires_gold = "false";
    obj.entries.ai_sticker_enabled = "true";
    obj.entries.ai_sticker_unlocked = "true";
    obj.entries.ai_sticker_gold_only = "false";
    obj.entries.ai_sticker_requires_gold = "false";
    obj.entries.ai_effects_enabled = "true";
    obj.entries.ai_effects_gold_only = "false";

    obj.entries.android_subscribe_gold_button_enabled = "false";
    obj.entries.profile_badge_visible = "true";
    obj.entries.lunar_new_year_app_icon_enabled = "true";
    obj.entries.settings_instagram_url = "https://instagram.com/ltoclock";
    obj.entries.settings_tiktok_url = "https://tiktok.com/@ltoclock";
    obj.entries.country_code = "US";
    obj.entries.region_code = "US";
    obj.entries.is_us_user = "true";

    obj.entries.camera_filters_enabled = "true";
    obj.entries.camera_filter_enabled = "true";
    obj.entries.holiday_filters_enabled = "true";
    obj.entries.ai_filters_enabled = "true";

    obj.entries.camera_filter_gold_only = "false";
    obj.entries.camera_filters_gold_only = "false";
    obj.entries.holiday_filters_gold_only = "false";
    obj.entries.filter_gold_only = "false";
    obj.entries.filters_gold_only = "false";
    obj.entries.ai_filter_gold_only = "false";
    obj.entries.ai_filters_gold_only = "false";
    obj.entries.filter_paywall_enabled = "false";
    obj.entries.camera_filter_paywall_enabled = "false";
    obj.entries.filter_upsell_enabled = "false";
    obj.entries.require_gold_for_filters = "false";
    obj.entries.require_gold_for_filter = "false";
    obj.entries.requires_gold_for_filters = "false";
    obj.entries.requires_gold_for_filter = "false";
    obj.entries.requires_gold_for_camera_filters = "false";
    obj.entries.camera_filter_requires_gold = "false";
    obj.entries.camera_filters_require_gold = "false";
    obj.entries.ai_filter_requires_gold = "false";
    obj.entries.ai_filters_require_gold = "false";
    obj.entries.filter_requires_gold = "false";
    obj.entries.filters_require_gold = "false";
    obj.entries.filtered_image_requires_gold = "false";
    obj.entries.filtered_images_require_gold = "false";
    obj.entries.filtered_image_gold_only = "false";
    obj.entries.filtered_images_gold_only = "false";
    obj.entries.free_filters_enabled = "true";
    obj.entries.filter_selection_enabled = "true";
    obj.entries.camera_filter_sheet_selection_enabled = "true";
    obj.entries.sheet_filters_selectable = "true";
    obj.entries.dismiss_filter_sheet_on_select = "true";

    obj.entries.history_ads_mode = "off";
    obj.entries.history_ads_prefetch_count = "0";
    obj.entries.history_ads_prefetch_immediate = "false";
    obj.entries.history_ads_prefetch_reroute = "false";
    obj.entries.history_ads_dynamic_insertion = "false";
    obj.entries.history_ads_refresh_prefetch_on_foreground = "false";
    obj.entries.history_ads_floor_price = "0";
    obj.entries.history_ads_floor_price_att = "0";
    obj.entries.history_ad_log_displayed_on_background = "false";
    obj.entries.history_ads_debug_menu = "false";
    obj.entries.sentry_sample_rate = "0";
    obj.entries.sentry_network_tracing = "false";
    obj.entries.sentry_performance_tracking = "false";
    obj.entries.sentry_trace_sample_rate = "0";
    obj.entries.sentry_profiles_sample_rate = "0";

    $done({ body: JSON.stringify(obj) });
    return;
  }

  if (isLocketApi && typeof $response !== "undefined" && typeof $response.body === "string") {
    let obj = null;
    try { obj = JSON.parse($response.body); } catch (e) { obj = null; }

    if (obj && typeof obj === "object") {
      const unlockTree = function (node) {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          for (let i = 0; i < node.length; i++) unlockTree(node[i]);
          return;
        }

        if ("is_gold" in node || "gold" in node || "tier" in node || "badge" in node) {
          node.is_gold = true;
          node.has_gold = true;
          node.is_gold_user = true;
          node.user_is_gold = true;
          node.gold_user = true;
          node.gold_active = true;
          node.gold = true;
          node.tier = "gold";
          node.badge = "locket_gold";
          node.badge_tier = "gold";
          node.subscription_status = "active";
          node.is_locked = false;
          node.requires_gold = false;
          node.unlocked = true;
          node.has_gold_features = true;
          node.has_gold_feature = true;
          node.has_ai_access = true;
          node.has_ai_access_granted = true;
          node.has_photobooth = true;
          node.has_ai_sticker = true;
          node.has_ai_filter = true;
        }

        if (node.feature_gates && typeof node.feature_gates === "object" && !Array.isArray(node.feature_gates)) {
          for (const k in node.feature_gates) {
            node.feature_gates[k] = "enabled";
          }
        }

        if (node.entries && typeof node.entries === "object") {
          node.entries.is_gold = "true";
          node.entries.has_gold = "true";
          node.entries.gold_active = "true";
          node.entries.all_filters_free = "true";
          node.entries.unlocked_filters = "true";
        }

        for (const k in node) {
          if (node[k] && typeof node[k] === "object") unlockTree(node[k]);
        }
      };

      unlockTree(obj);

      if (obj.result && typeof obj.result === "object") {
        obj.result.is_gold = true;
        obj.result.has_gold = true;
        obj.result.status = 200;
        obj.result.success = true;
        obj.result.unlocked = true;
        obj.result.is_locked = false;
        obj.result.requires_gold = false;
      }
      if (obj.data && typeof obj.data === "object") {
        obj.data.is_gold = true;
        obj.data.has_gold = true;
        obj.data.success = true;
        obj.data.unlocked = true;
      }

      $done({ status: 200, body: JSON.stringify(obj) });
      return;
    }

    $done({ status: 200, body: $response.body });
    return;
  }

  if (typeof $request !== "undefined") {
    const headers = Object.assign({}, $request.headers || {});
    for (const k in headers) {
      const kl = k.toLowerCase();
      if (kl === "if-none-match" || kl === "if-modified-since" || kl === "cache-control" || kl === "etag" || kl === "revenuecat-etag") {
        delete headers[k];
      }
    }
    $done({ headers: headers });
    return;
  }

  $done({});
})();
