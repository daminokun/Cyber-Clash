const ADAPTATION_RULES = {
  "api-key-exposure": {
    redAdaptationActions: ["do_nothing", "redirect_key_use", "rotate_target"],
    counteredDefensesByAdaptation: {
      redirect_key_use: ["revoke_key"],
      rotate_target: ["remove_public_file"]
    }
  },
  "backup-integrity": {
    redAdaptationActions: ["do_nothing", "corrupt_recovery_metadata"],
    counteredDefensesByAdaptation: {
      corrupt_recovery_metadata: ["start_recovery_check"]
    }
  },
  "bluetooth-device-pairing": {
    redAdaptationActions: ["do_nothing", "switch_device_identity"],
    counteredDefensesByAdaptation: {
      switch_device_identity: ["deny_pairing"]
    }
  },
  "calendar-invite-abuse": {
    redAdaptationActions: ["do_nothing", "redirect_recipient"],
    counteredDefensesByAdaptation: {
      redirect_recipient: ["delete_invite"]
    }
  },
  "cloud-permission-abuse": {
    redAdaptationActions: ["do_nothing", "create_shadow_account"],
    counteredDefensesByAdaptation: {
      create_shadow_account: ["revoke_access"]
    }
  },
  "container-image-risk": {
    redAdaptationActions: ["do_nothing", "publish_second_image"],
    counteredDefensesByAdaptation: {
      publish_second_image: ["reject_deployment"]
    }
  },
  "data-exfiltration": {
    redAdaptationActions: ["do_nothing", "route_transfer_through_proxy"],
    counteredDefensesByAdaptation: {
      route_transfer_through_proxy: ["block_transfer"]
    }
  },
  "dns-redirection": {
    redAdaptationActions: ["do_nothing", "rotate_dns_target"],
    counteredDefensesByAdaptation: {
      rotate_dns_target: ["flush_dns_cache"]
    }
  },
  "insider-data-access": {
    redAdaptationActions: ["do_nothing", "switch_account", "use_service_account"],
    counteredDefensesByAdaptation: {
      switch_account: ["restrict_records"],
      use_service_account: ["suspend_account"]
    }
  },
  "iot-device-compromise": {
    redAdaptationActions: ["do_nothing", "pivot_to_second_device"],
    counteredDefensesByAdaptation: {
      pivot_to_second_device: ["quarantine_device"]
    }
  },
  "log-tampering": {
    redAdaptationActions: ["do_nothing", "forge_audit_trail"],
    counteredDefensesByAdaptation: {
      forge_audit_trail: ["protect_logs"]
    }
  },
  "lost-laptop": {
    redAdaptationActions: ["do_nothing", "use_cloud_session"],
    counteredDefensesByAdaptation: {
      use_cloud_session: ["lock_device"]
    }
  },
  "malware-download": {
    redAdaptationActions: ["do_nothing", "stage_payload_elsewhere"],
    counteredDefensesByAdaptation: {
      stage_payload_elsewhere: ["quarantine_file"]
    }
  },
  "mfa-fatigue": {
    redAdaptationActions: ["do_nothing", "delay_prompt_attack"],
    counteredDefensesByAdaptation: {
      delay_prompt_attack: ["deny_prompts"]
    }
  },
  "mobile-app-permission": {
    redAdaptationActions: ["do_nothing", "request_minimal_permission"],
    counteredDefensesByAdaptation: {
      request_minimal_permission: ["deny_permission"]
    }
  },
  "network-port-scan": {
    redAdaptationActions: ["do_nothing", "scan_from_proxy"],
    counteredDefensesByAdaptation: {
      scan_from_proxy: ["isolate_host"]
    }
  },
  "password-reset-abuse": {
    redAdaptationActions: ["do_nothing", "switch_recovery_channel"],
    counteredDefensesByAdaptation: {
      switch_recovery_channel: ["lock_recovery"]
    }
  },
  "printer-network-risk": {
    redAdaptationActions: ["do_nothing", "pivot_to_admin_panel"],
    counteredDefensesByAdaptation: {
      pivot_to_admin_panel: ["isolate_printer"]
    }
  },
  "public-wifi-evil-twin": {
    redAdaptationActions: ["do_nothing", "move_to_rogue_access_point"],
    counteredDefensesByAdaptation: {
      move_to_rogue_access_point: ["remove_access_point"]
    }
  },
  "qr-code-phishing": {
    redAdaptationActions: ["do_nothing", "replace_destination"],
    counteredDefensesByAdaptation: {
      replace_destination: ["remove_poster"]
    }
  },
  "ransomware-warning": {
    redAdaptationActions: ["do_nothing", "move_to_unbacked_share", "accelerate_encryption"],
    counteredDefensesByAdaptation: {
      move_to_unbacked_share: ["isolate_server"],
      accelerate_encryption: ["restore_backup"]
    }
  },
  "rogue-browser-extension": {
    redAdaptationActions: ["do_nothing", "rename_extension"],
    counteredDefensesByAdaptation: {
      rename_extension: ["disable_extension"]
    }
  },
  "service-account-abuse": {
    redAdaptationActions: ["do_nothing", "create_second_identity"],
    counteredDefensesByAdaptation: {
      create_second_identity: ["disable_service_account"]
    }
  },
  "social-engineering-call": {
    redAdaptationActions: ["do_nothing", "switch_pretext"],
    counteredDefensesByAdaptation: {
      switch_pretext: ["end_call"]
    }
  },
  "supply-chain-update": {
    redAdaptationActions: ["do_nothing", "publish_hotfix"],
    counteredDefensesByAdaptation: {
      publish_hotfix: ["reject_update"]
    }
  },
  "usb-device-threat": {
    redAdaptationActions: ["do_nothing", "swap_device"],
    counteredDefensesByAdaptation: {
      swap_device: ["quarantine_device"]
    }
  },
  "voip-impersonation": {
    redAdaptationActions: ["do_nothing", "route_to_second_operator"],
    counteredDefensesByAdaptation: {
      route_to_second_operator: ["end_call"]
    }
  },
  "web-form-injection": {
    redAdaptationActions: ["do_nothing", "use_encoded_payload"],
    counteredDefensesByAdaptation: {
      use_encoded_payload: ["block_source"]
    }
  }
};

function getAdaptationRules(scenarioId) {
  return ADAPTATION_RULES[scenarioId] || {
    redAdaptationActions: ["do_nothing"],
    counteredDefensesByAdaptation: {}
  };
}

module.exports = { getAdaptationRules };
