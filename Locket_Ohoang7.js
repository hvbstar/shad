// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold'] // Đảm bảo rằng Locket Gold được sử dụng đúng cách
};

// ========= Phần cố định ========= //
// ========= @HoangVanBao ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);
obj.Attention = "Chúc mừng bạn Hoàng Văn Bảo! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Tạo thông tin về gói Locket Gold
var hoangvanbao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z", // Ngày hết hạn lâu dài
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

var hvb_entitlement = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.hoangvanbao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra loại gói và gán Locket Gold vào entitlements
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s ? (hvb_entitlement.product_identifier = s, obj.subscriber.subscriptions[s] = hoangvanbao) : obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements[e] = hvb_entitlement; // Gán Locket Gold vào entitlements
} else {
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = hoangvanbao;
  obj.subscriber.entitlements.Locket = hvb_entitlement; // Đảm bảo Locket Gold được thêm vào
}

$done({ body: JSON.stringify(obj) });
