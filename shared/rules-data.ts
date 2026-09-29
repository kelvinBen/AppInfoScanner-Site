// 规则中心数据源 —— 由 scripts/sync-rules.py 从主仓库 libs/core/default_config.py 自动生成, 勿手改。
// 同步时间: 2026-09-29 · 配置版本: 1.0.11

export interface RegexRuleSet { name: string; patterns: string[] }
export interface KVRule { key: string; value: string }
export interface ShellVendor { vendor: string; classes: string[]; so: string[]; assets: string[] }
export interface RuleList { group: string; items: string[] }

export interface RuleCategory {
  id: string
  nameZh: string
  nameEn: string
  descZh: string
  descEn: string
  kind: 'regexsets' | 'kv' | 'shell' | 'lists' | 'domains'
  count: number
  data: RegexRuleSet[] | KVRule[] | ShellVendor[] | RuleList[] | string[]
}

export const ruleCategories: RuleCategory[] = [
  {
    "id": "ak",
    "nameZh": "凭据检测",
    "nameEn": "Credentials (AK/SK)",
    "kind": "regexsets",
    "data": [
      {
        "name": "Aliyun_OSS",
        "patterns": [
          "(?i)(?:aliyun|ali|oss)[_-]?(?:access[_-]?key[_-]?id|access[_-]?key[_-]?secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z]{10,}[\\'\"]",
          "(?i)(?:aliyun|ali|oss)[_-]?secret[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z]{20,}[\\'\"]",
          "LTAI[A-Za-z0-9]{12,20}"
        ]
      },
      {
        "name": "Tencent_Cloud",
        "patterns": [
          "AKID[A-Za-z0-9]{32}"
        ]
      },
      {
        "name": "Amazon_AWS_AccessKeyID",
        "patterns": [
          "(?:AKIA|ASIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|A3T)[A-Z0-9]{16}"
        ]
      },
      {
        "name": "Google_APIKey",
        "patterns": [
          "AIza[0-9A-Za-z\\-_]{35}"
        ]
      },
      {
        "name": "Google_OAuth_ClientID",
        "patterns": [
          "[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com"
        ]
      },
      {
        "name": "Cloudinary",
        "patterns": [
          "cloudinary://[0-9]{15}:[0-9A-Za-z]+@[a-z]+"
        ]
      },
      {
        "name": "GitHub_Token",
        "patterns": [
          "(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}",
          "github_pat_[A-Za-z0-9_]{20,}"
        ]
      },
      {
        "name": "GitLab_PAT",
        "patterns": [
          "glpat-[A-Za-z0-9\\-_]{20}"
        ]
      },
      {
        "name": "Slack_Token",
        "patterns": [
          "xox[bapoir]-[A-Za-z0-9\\-]{10,}"
        ]
      },
      {
        "name": "Slack_Webhook",
        "patterns": [
          "https://hooks\\.slack\\.com/services/T[A-Za-z0-9_]{8,}/B[A-Za-z0-9_]{8,}/[A-Za-z0-9_]{24}"
        ]
      },
      {
        "name": "Stripe_Key",
        "patterns": [
          "[sr]k_live_[0-9a-zA-Z]{24}"
        ]
      },
      {
        "name": "Square_Token",
        "patterns": [
          "sq0atp-[0-9A-Za-z\\-_]{22}",
          "sq0csp-[0-9A-Za-z\\-_]{43}"
        ]
      },
      {
        "name": "PayPal_Braintree",
        "patterns": [
          "access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}"
        ]
      },
      {
        "name": "Twilio_APIKey",
        "patterns": [
          "SK[0-9a-fA-F]{32}"
        ]
      },
      {
        "name": "SendGrid_Key",
        "patterns": [
          "SG\\.[A-Za-z0-9\\-_]{22}\\.[A-Za-z0-9\\-_]{43}"
        ]
      },
      {
        "name": "Mailgun_Key",
        "patterns": [
          "key-[0-9a-zA-Z]{32}"
        ]
      },
      {
        "name": "Facebook_AccessToken",
        "patterns": [
          "EAACEdEose0c[A-Za-z0-9]+"
        ]
      },
      {
        "name": "Discord_Bot_Token",
        "patterns": [
          "[NMz][A-Za-z0-9]{23}\\.[A-Za-z0-9]{6}\\.[A-Za-z0-9]{27}"
        ]
      },
      {
        "name": "JWT",
        "patterns": [
          "eyJ[A-Za-z0-9_\\-]{8,}\\.[A-Za-z0-9_\\-]{8,}\\.[A-Za-z0-9_\\-]*"
        ]
      },
      {
        "name": "Private_Key_Block",
        "patterns": [
          "-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----"
        ]
      },
      {
        "name": "Authorization_Header",
        "patterns": [
          "(?i)basic\\s+[A-Za-z0-9_\\-:\\.=]{16,}",
          "(?i)bearer\\s+[A-Za-z0-9_\\-:\\.=]{16,}"
        ]
      },
      {
        "name": "Password_In_URL",
        "patterns": [
          "://[A-Za-z0-9_\\-]+:[A-Za-z0-9_@!#$%^&*\\-]{3,}@"
        ]
      },
      {
        "name": "Generic_API_Key",
        "patterns": [
          "(?i)(?:api[_-]?key|apikey|app[_-]?key|access[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z\\-_]{8,}[\\'\"]"
        ]
      },
      {
        "name": "Generic_Secret",
        "patterns": [
          "(?i)(?:secret|password|passwd|pwd|pass)[a-z_-]*[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z\\-_!@#$%^&*]{8,}[\\'\"]"
        ]
      },
      {
        "name": "Generic_Token",
        "patterns": [
          "(?i)token[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z\\-_.=+]{8,}[\\'\"]"
        ]
      },
      {
        "name": "Cloud_OSS_Key",
        "patterns": [
          "(?i)(?:oss|cos|s3|storage)[_-]?(?:access[_-]?(?:key|id)|secret|key)[a-z]*[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z\\-_]{8,}[\\'\"]"
        ]
      },
      {
        "name": "WeChat_SDK",
        "patterns": [
          "(?i)(?:wx|wechat|weixin)[_-]?(?:app[_-]?secret|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-f]{32}[\\'\"]",
          "(?i)(?:app[_-]?id)[\\'\"]?\\s*[:=]\\s*[\\'\"]wx[0-9a-f]{16}[\\'\"]"
        ]
      },
      {
        "name": "Alipay_SDK",
        "patterns": [
          "(?i)(?:alipay|ali)[_-]?(?:app[_-]?id|pid|merchant[_-]?id)[\\'\"]?\\s*[:=]\\s*[\\'\"]\\d{16}[\\'\"]",
          "(?i)(?:alipay|ali)[_-]?(?:private[_-]?key|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"]MIIC[a-zA-Z0-9+/=]{50,}[\\'\"]"
        ]
      },
      {
        "name": "Weibo_SDK",
        "patterns": [
          "(?i)(?:weibo|sina)[_-]?(?:app[_-]?key|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-f]{10,32}[\\'\"]"
        ]
      },
      {
        "name": "Database_Auth",
        "patterns": [
          "(?i)(?:mongo(?:db)?|postgres(?:ql)?|mysql|mariadb|amqp|rabbitmq)://[^\\s\"\\':]+:[^\\s\"\\']+@[^\\s\"\\']+",
          "(?i)redis://:[^\\s\"\\']+@"
        ]
      },
      {
        "name": "Huawei_Cloud",
        "patterns": [
          "(?i)(?:huawei|hw)[_-]?(?:ak|access[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"][A-Z0-9]{10,}[\\'\"]"
        ]
      },
      {
        "name": "Azure_Storage",
        "patterns": [
          "AccountKey=[A-Za-z0-9+/=]{50,}"
        ]
      },
      {
        "name": "AWS_SecretKey",
        "patterns": [
          "(?i)aws[_-]?secret[_-]?access[_-]?key[\\'\"]?\\s*[:=]\\s*[\\'\"][A-Za-z0-9/+=]{40}[\\'\"]"
        ]
      },
      {
        "name": "Sentry_DSN",
        "patterns": [
          "https://[0-9a-f]{32}@[0-9a-f]{16}\\.ingest\\.sentry\\.io"
        ]
      },
      {
        "name": "AI_OpenAI",
        "patterns": [
          "sk-(?!ant-)(?:proj-)?[a-zA-Z0-9_-]{20,}"
        ]
      },
      {
        "name": "AI_Anthropic",
        "patterns": [
          "sk-ant-(?:api03-)?[a-zA-Z0-9_-]{20,}"
        ]
      },
      {
        "name": "AI_HuggingFace",
        "patterns": [
          "hf_[a-zA-Z0-9]{20,}"
        ]
      },
      {
        "name": "AI_DashScope",
        "patterns": [
          "(?i)(?:dashscope|qwen|tongyi)[_-]?(?:key|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"]sk-[a-zA-Z0-9]{10,}[\\'\"]"
        ]
      },
      {
        "name": "AI_GLM",
        "patterns": [
          "(?i)(?:zhipu|glm|chatglm)[_-]?(?:key|api[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"]\\w{6,12}\\.[a-zA-Z0-9]{8,}[\\'\"]"
        ]
      },
      {
        "name": "AI_Baidu_ERNIE",
        "patterns": [
          "(?i)(?:ernie|wenxin|baidu[_-]?ai|千帆)[_-]?(?:secret[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z]{20,}[\\'\"]"
        ]
      },
      {
        "name": "Map_AMap",
        "patterns": [
          "(?i)(?:amap|gaode|高德)[_-]?(?:key|api[_-]?key|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-f]{32}[\\'\"]"
        ]
      },
      {
        "name": "Map_Baidu",
        "patterns": [
          "(?i)(?:bmap|baidu[_-]?map|百度地图)[_-]?(?:ak|api[_-]?key|sn)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-zA-Z]{24}[\\'\"]"
        ]
      },
      {
        "name": "Map_Tencent",
        "patterns": [
          "(?i)(?:qq[_-]?map|tencent[_-]?map|腾讯地图)[_-]?(?:key|sk)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9A-Z]{26,32}[\\'\"]"
        ]
      },
      {
        "name": "Map_Box",
        "patterns": [
          "(?:pk|sk)\\.eyJ[a-zA-Z0-9._-]{40,}"
        ]
      },
      {
        "name": "AI_DeepSeek",
        "patterns": [
          "(?i)deepseek[_-]?(?:key|api[_-]?key|token)[\\'\"]?\\s*[:=]\\s*[\\'\"]sk-[a-zA-Z0-9]{20,}[\\'\"]",
          "api\\.deepseek\\.com"
        ]
      },
      {
        "name": "AI_Moonshot",
        "patterns": [
          "(?i)(?:moonshot|kimi)[_-]?(?:key|api[_-]?key|token)[\\'\"]?\\s*[:=]\\s*[\\'\"]sk-[a-zA-Z0-9]{20,}[\\'\"]",
          "api\\.moonshot\\.cn"
        ]
      },
      {
        "name": "AI_MiniMax",
        "patterns": [
          "(?i)minimax[_-]?(?:key|api[_-]?key|token)[\\'\"]?\\s*[:=]\\s*[\\'\"]eyJ[a-zA-Z0-9._-]{20,}[\\'\"]",
          "api\\.minimaxi?\\.chat"
        ]
      },
      {
        "name": "AI_Volcengine",
        "patterns": [
          "(?i)(?:volcengine|doubao|huoshan|ark)[_-]?(?:key|api[_-]?key|token|secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][a-zA-Z0-9\\-_.]{16,}[\\'\"]",
          "ark\\.cn-[a-z]+\\.volces\\.com"
        ]
      },
      {
        "name": "AI_SiliconCloud",
        "patterns": [
          "(?i)silicon(?:cloud|flow)[_-]?(?:key|api[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"]sk-[a-zA-Z0-9]{20,}[\\'\"]",
          "api\\.siliconflow\\.cn"
        ]
      },
      {
        "name": "AI_Iflytek_Spark",
        "patterns": [
          "(?i)(?:spark|xunfei|iflytek)[_-]?(?:api[_-]?key|api[_-]?secret)[\\'\"]?\\s*[:=]\\s*[\\'\"][0-9a-f]{16,}[\\'\"]"
        ]
      },
      {
        "name": "AI_Groq",
        "patterns": [
          "gsk_[a-zA-Z0-9]{20,}"
        ]
      },
      {
        "name": "AI_OpenRouter",
        "patterns": [
          "sk-or-(?:v1-)?[a-zA-Z0-9-]{20,}"
        ]
      },
      {
        "name": "AI_Together",
        "patterns": [
          "tgp_[a-zA-Z0-9_]{20,}"
        ]
      },
      {
        "name": "AI_Endpoints",
        "patterns": [
          "https?://api\\.(?:openai|deepseek|anthropic|groq|together)\\.com[/\\w.-]*",
          "https?://api\\.(?:moonshot\\.cn|minimaxi?\\.chat|siliconflow\\.cn)[/\\w.-]*",
          "https?://dashscope\\.aliyuncs\\.com[/\\w.-]*",
          "https?://ark\\.cn-[a-z]+\\.volces\\.com[/\\w.-]*",
          "https?://open\\.bigmodel\\.cn[/\\w.-]*",
          "https?://aip\\.baidubce\\.com[/\\w.-]*",
          "https?://api\\.minimax\\.chat[/\\w.-]*"
        ]
      },
      {
        "name": "Coding_AI",
        "patterns": [
          "(?i)(?:cursor|windsurf|codeium|tabnine|copilot|jetbrains[_-]?ai|cody|sourcegraph|augment)[_-]?(?:key|token|api[_-]?key)[\\'\"]?\\s*[:=]\\s*[\\'\"][a-zA-Z0-9\\-_.=+]{16,}[\\'\"]"
        ]
      },
      {
        "name": "Firebase_Config",
        "patterns": [
          "(?i)firebase[_-]?(?:api[_-]?key|config)[\\'\"]?\\s*[:=]\\s*[\\'\"][A-Za-z0-9\\-_]{30,}[\\'\"]"
        ]
      }
    ],
    "descZh": "云厂商与平台的密钥 / 令牌、JWT / 私钥 / 通用凭据形态（filter_ak_map）",
    "descEn": "Cloud keys/tokens, JWT, private keys and generic credentials (filter_ak_map)",
    "count": 75
  },
  {
    "id": "pii",
    "nameZh": "PII 检测",
    "nameEn": "PII Detection",
    "kind": "regexsets",
    "data": [
      {
        "name": "Phone_CN",
        "patterns": [
          "(?<!\\d)1[3-9]\\d{9}(?!\\d)"
        ]
      },
      {
        "name": "IDCard_CN_18",
        "patterns": [
          "(?<![0-9Xx])[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])\\d{3}[0-9Xx](?![0-9Xx])"
        ]
      },
      {
        "name": "Email",
        "patterns": [
          "[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,}"
        ]
      },
      {
        "name": "BankCard_CN",
        "patterns": [
          "(?<!\\d)62\\d{14,17}(?!\\d)"
        ]
      },
      {
        "name": "Plate_CN",
        "patterns": [
          "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:[A-HJ-NP-Z0-9]{4}[挂学警港澳]|[A-HJ-NP-Z0-9]{5,6})"
        ]
      },
      {
        "name": "Person_Name_CN",
        "patterns": [
          "(?:姓名|联系人|真实姓名|收货人|经办人)[：:\\s]{0,4}([\\u4e00-\\u9fa5·]{2,4})"
        ]
      },
      {
        "name": "QQ_Number",
        "patterns": [
          "(?i)(?:qq|扣扣|企鹅号)[^\\d]{0,6}([1-9]\\d{5,10})(?!\\d)"
        ]
      },
      {
        "name": "USCC_CN",
        "patterns": [
          "(?<![0-9A-Z])[1-9A-HJ-NPQRTUWXY][0-9A-HJ-NPQRTUWXY]\\d{6}[0-9A-HJ-NPQRTUWXY]{10}(?![0-9A-Z])"
        ]
      },
      {
        "name": "MAC_Address",
        "patterns": [
          "(?<![0-9A-Fa-f])(?:[0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}(?![0-9A-Fa-f])"
        ]
      },
      {
        "name": "Passport_CN",
        "patterns": [
          "(?:护照|passport|护照号)[：:\\s]{0,4}([EeGg]\\d{8})(?!\\d)"
        ]
      },
      {
        "name": "VIN",
        "patterns": [
          "(?:vin|车架号|车架)[：:\\s]{0,4}([A-HJ-NPR-Z0-9]{17})(?![A-Z0-9])"
        ]
      },
      {
        "name": "IMEI",
        "patterns": [
          "(?:imei|device[_-]?id|设备号)[：:\\s]{0,4}(\\d{15})(?!\\d)"
        ]
      },
      {
        "name": "Phone_Intl",
        "patterns": [
          "(?:tel|phone|mobile|电话|手机)[：:\\s]{0,4}(\\+\\d{1,3}[\\s\\d\\-]{8,16})(?![\\d])"
        ]
      },
      {
        "name": "Address_CN",
        "patterns": [
          "(?:地址|住址|收货地址|address)[：:\\s]{0,4}([\\u4e00-\\u9fa5]{2,6}(?:省|市|区|县|镇|乡|村|路|街|道|号|楼|室)[\\u4e00-\\u9fa50-9A-Za-z\\-]{4,40})"
        ]
      }
    ],
    "descZh": "个人 / 企业敏感信息规则集（filter_pii_map，关键项带校验位验证）",
    "descEn": "Personal / corporate sensitive data (filter_pii_map, checksum-validated)",
    "count": 14
  },
  {
    "id": "android-comp",
    "nameZh": "Android 组件",
    "nameEn": "Android Components",
    "kind": "kv",
    "data": [
      {
        "key": "com.alibaba.fastjson",
        "value": "fastjson, autoType反序列化RCE(CVE-2022-25845等)；安全版本>=1.2.83，CVE-2022-25845 (autoType RCE)"
      },
      {
        "key": "com.fasterxml.jackson",
        "value": "jackson, 多态反序列化(CVE-2017-7525等)"
      },
      {
        "key": "com.google.gson",
        "value": "gson JSON解析"
      },
      {
        "key": "net.sf.json",
        "value": "json-lib(老旧JSON库)"
      },
      {
        "key": "com.thoughtworks.xstream",
        "value": "XStream, 反序列化RCE(CVE-2021-21344等)"
      },
      {
        "key": "org.apache.commons.collections",
        "value": "Commons Collections, 反序列化RCE gadget链"
      },
      {
        "key": "org.apache.commons.beanutils",
        "value": "Commons BeanUtils, 反序列化gadget"
      },
      {
        "key": "org.apache.commons.fileupload",
        "value": "Commons FileUpload(CVE-2016-1000031)"
      },
      {
        "key": "org.apache.logging.log4j",
        "value": "Log4j, JNDI注入RCE(Log4Shell, CVE-2021-44228)；安全版本>=2.17.0，CVE-2021-44228 (Log4Shell)"
      },
      {
        "key": "org.apache.shiro",
        "value": "Shiro, rememberMe反序列化(CVE-2016-4437/CVE-2019-12422)"
      },
      {
        "key": "org.apache.struts2",
        "value": "Struts2, OGNL注入RCE(S2-045/S2-057等)"
      },
      {
        "key": "org.springframework",
        "value": "Spring框架(Spring4Shell CVE-2022-22965等)"
      },
      {
        "key": "org.yaml.snakeyaml",
        "value": "SnakeYAML, 反序列化RCE(CVE-2022-1471)"
      },
      {
        "key": "javax.xml.parsers.DocumentBuilder",
        "value": "DOM解析, XXE风险"
      },
      {
        "key": "javax.xml.parsers.SAXParser",
        "value": "SAX解析, XXE风险"
      },
      {
        "key": "org.jdom.input.SAXBuilder",
        "value": "jdom, XXE风险"
      },
      {
        "key": "org.dom4j.io.SAXReader",
        "value": "dom4j, XXE(CVE-2020-10642)"
      },
      {
        "key": "org.apache.xerces",
        "value": "Xerces, XXE风险(关注版本)"
      },
      {
        "key": "org.bouncycastle",
        "value": "BouncyCastle加密库(CVE-2023-33201等,关注版本)；安全版本>=1.74，CVE-2023-33201 (LDAP injection)"
      },
      {
        "key": "io.netty",
        "value": "Netty网络库(CVE-2021-21290等,关注版本)"
      }
    ],
    "descZh": "组件识别规则（filter_components，按 smali 路径匹配；含 CVE 版本对照内联）",
    "descEn": "Component rules (filter_components, matched by smali path; CVE notes inlined)",
    "count": 20
  },
  {
    "id": "ios-comp",
    "nameZh": "iOS 组件",
    "nameEn": "iOS Components",
    "kind": "kv",
    "data": [
      {
        "key": "SSZipArchive",
        "value": "解压库, Zip-Slip目录穿越(CVE-2018-1002200)"
      },
      {
        "key": "OpenSSL",
        "value": "OpenSSL(关注版本对应CVE)"
      },
      {
        "key": "libxml",
        "value": "libxml2, XXE(CVE系列)"
      },
      {
        "key": "curl/",
        "value": "libcurl(版本相关CVE)"
      },
      {
        "key": "AFNetworking",
        "value": "HTTP库(老版本证书校验问题)"
      },
      {
        "key": "Alamofire",
        "value": "Swift HTTP库"
      },
      {
        "key": "SocketRocket",
        "value": "WebSocket库"
      },
      {
        "key": "Starscream",
        "value": "Swift WebSocket库"
      },
      {
        "key": "Firebase",
        "value": "Firebase SDK"
      },
      {
        "key": "FIRMessaging",
        "value": "Firebase推送"
      },
      {
        "key": "WXApi",
        "value": "微信SDK"
      },
      {
        "key": "AlipaySDK",
        "value": "支付宝SDK"
      },
      {
        "key": "JPUSHService",
        "value": "极光推送"
      },
      {
        "key": "UMCommon",
        "value": "友盟统计"
      },
      {
        "key": "Bugly",
        "value": "腾讯Bugly"
      },
      {
        "key": "ShareSDK",
        "value": "ShareSDK分享"
      },
      {
        "key": "NIMSDK",
        "value": "网易云信IM"
      },
      {
        "key": "RongCloudIM",
        "value": "融云IM"
      },
      {
        "key": "HyphenateChat",
        "value": "环信IM"
      },
      {
        "key": "GrowingIO",
        "value": "GrowingIO统计"
      },
      {
        "key": "FLEX",
        "value": "FLEX运行时调试工具, 泄漏大量应用内部信息"
      },
      {
        "key": "WebViewJavascriptBridge",
        "value": "JS-Native桥, 评估桥接口攻击面"
      }
    ],
    "descZh": "组件识别规则（ios_components，按二进制 strings 内容匹配）",
    "descEn": "Component rules (ios_components, matched against binary strings)",
    "count": 22
  },
  {
    "id": "shell",
    "nameZh": "加固特征",
    "nameEn": "Packer Signatures",
    "kind": "shell",
    "data": [
      {
        "vendor": "360加固",
        "classes": [
          "com.stub.StubApp",
          "com.qihoo.util.StubApp"
        ],
        "so": [
          "libjiagu.so",
          "libjiagu_art.so",
          "libjiagu_x86.so",
          "libprotectClass.so",
          "1ibjgdtc.so",
          "libjgdtc.so",
          "libjgdtc_a64.so",
          "libjgdtc_art.so",
          "libjgdtc_x64.so",
          "libjgdtc_x86.so",
          "libjiagu_a64.so",
          "libjiagu_ls.so",
          "libjiagu_x64.so"
        ],
        "assets": [
          "assets/.appkey",
          "assets/libjiagu.so",
          ".appkey"
        ]
      },
      {
        "vendor": "APKProtect",
        "classes": [],
        "so": [
          "libAPKProtect.so"
        ],
        "assets": []
      },
      {
        "vendor": "UU安全",
        "classes": [],
        "so": [
          "libuusafe.jar.so",
          "libuusafe.so",
          "libuusafeempty.so",
          "lib/armeabi/libuusafeempty.so"
        ],
        "assets": [
          "assets/libuusafe.jar.so",
          "assets/libuusafe.so"
        ]
      },
      {
        "vendor": "apktoolplus",
        "classes": [
          "com.linchaolong.apktoolplus.jiagu.ProxyApplication"
        ],
        "so": [
          "lib/armeabi/libapktoolplus_jiagu.so",
          "libapktoolplus_jiagu.so"
        ],
        "assets": [
          "assets/jiagu_data.bin",
          "assets/sign.bin",
          "jiagu_data.bin",
          "sign.bin"
        ]
      },
      {
        "vendor": "中国移动加固",
        "classes": [
          "com.mogosec.AppMgr"
        ],
        "so": [
          "ibmogosecurity.so",
          "lib/armeabi/libcmvmp.so",
          "lib/armeabi/libmogosec_dex.so",
          "lib/armeabi/libmogosec_sodecrypt.so",
          "lib/armeabi/libmogosecurity.so",
          "libcmvmp.so",
          "libmogosec_dex.so",
          "libmogosec_sodecrypt.so"
        ],
        "assets": [
          "assets/mogosec_classes",
          "assets/mogosec_data",
          "assets/mogosec_dexinfo",
          "assets/mogosec_march",
          "mogosec_classes",
          "mogosec_data",
          "mogosec_dexinfo",
          "mogosec_march"
        ]
      },
      {
        "vendor": "几维安全",
        "classes": [
          "com.Kiwisec.KiwiSecApplication",
          "com.Kiwisec.ProxyApplication"
        ],
        "so": [
          "lib/armeabi/kdpdata.so",
          "lib/armeabi/libkdp.so",
          "lib/armeabi/libkwscmm.so",
          "libkwscmm.so",
          "libkwscr.so",
          "libkwslinker.so"
        ],
        "assets": [
          "assets/dex.dat"
        ]
      },
      {
        "vendor": "厂商未知",
        "classes": [
          "com.coral.util.StubApplication"
        ],
        "so": [],
        "assets": []
      },
      {
        "vendor": "启明星辰",
        "classes": [],
        "so": [
          "libvenSec.so",
          "libvenustech.so"
        ],
        "assets": []
      },
      {
        "vendor": "娜迦加固",
        "classes": [
          "com.nagain.NagainApplication"
        ],
        "so": [
          "libchaosvmp.so",
          "libddog.so",
          "libfdog.so"
        ],
        "assets": []
      },
      {
        "vendor": "娜迦加固（企业版）",
        "classes": [],
        "so": [
          "libedog.so"
        ],
        "assets": []
      },
      {
        "vendor": "娜迦加固（新版2022）",
        "classes": [],
        "so": [
          "lib/armeabi/libxloader.so",
          "lib/armeabi-v7a/libxloader.so",
          "lib/arm64-v8a/libxloader.so",
          "libxloader.so"
        ],
        "assets": [
          "assets/maindata/fake_classes.dex"
        ]
      },
      {
        "vendor": "梆梆安全",
        "classes": [
          "com.secneo.apkwrapper.ApplicationWrapper",
          "com.secshell.secData.ApplicationWrapper"
        ],
        "so": [
          "libSecShell.so",
          "libsecexe.so",
          "libsecmain.so",
          "libSecShel1.so"
        ],
        "assets": []
      },
      {
        "vendor": "梆梆安全（企业版）",
        "classes": [],
        "so": [
          "libDexHelper-x86.so",
          "libDexHelper.so",
          "1ibDexHelper.so"
        ],
        "assets": []
      },
      {
        "vendor": "梆梆安全（免费版）",
        "classes": [],
        "so": [
          "lib/armeabi/libSecShell-x86.so",
          "lib/armeabi/libSecShell.so"
        ],
        "assets": [
          "assets/secData0.jar"
        ]
      },
      {
        "vendor": "梆梆安全（定制版）",
        "classes": [],
        "so": [
          "lib/armeabi/DexHelper.so"
        ],
        "assets": [
          "assets/classes.jar"
        ]
      },
      {
        "vendor": "海云安加固",
        "classes": [],
        "so": [
          "lib/armeabi/libitsec.so",
          "libitsec.so"
        ],
        "assets": [
          "assets/itse"
        ]
      },
      {
        "vendor": "爱加密",
        "classes": [
          "s.h.e.l.l.S"
        ],
        "so": [
          "lib/armeabi/libexecmain.so",
          "libexecmain.so"
        ],
        "assets": [
          "assets/af.bin",
          "assets/ijiami.ajm",
          "assets/ijm_lib/X86/libexec.so",
          "assets/ijm_lib/armeabi/libexec.so",
          "assets/signed.bin",
          "ijiami.dat"
        ]
      },
      {
        "vendor": "爱加密企业版",
        "classes": [
          "c.b.c.b"
        ],
        "so": [],
        "assets": [
          "ijiami.ajm"
        ]
      },
      {
        "vendor": "珊瑚灵御",
        "classes": [],
        "so": [
          "libreincp.so",
          "libreincp_x86.so"
        ],
        "assets": [
          "assets/libreincp.so",
          "assets/libreincp_x86.so"
        ]
      },
      {
        "vendor": "瑞星加固",
        "classes": [],
        "so": [
          "librsprotect.so"
        ],
        "assets": []
      },
      {
        "vendor": "百度加固",
        "classes": [
          "com.baidu.px.PaxApp"
        ],
        "so": [
          "libbaiduprotect.so",
          "lib/armeabi/libbaiduprotect.so",
          "libbaiduprotect_art.so",
          "libbaiduprotect_x86.so"
        ],
        "assets": [
          "assets/baiduprotect.jar",
          "assets/baiduprotect1.jar",
          "baiduprotect1.jar"
        ]
      },
      {
        "vendor": "盛大加固",
        "classes": [],
        "so": [
          "libapssec.so"
        ],
        "assets": []
      },
      {
        "vendor": "网易易盾",
        "classes": [
          "com.netease.nis.wrapper.MyApplication"
        ],
        "so": [
          "libnesec.so"
        ],
        "assets": []
      },
      {
        "vendor": "网秦加固",
        "classes": [],
        "so": [
          "libnqshield.so"
        ],
        "assets": []
      },
      {
        "vendor": "腾讯",
        "classes": [],
        "so": [
          "libexec.so",
          "libshell.so"
        ],
        "assets": []
      },
      {
        "vendor": "腾讯Bugly",
        "classes": [],
        "so": [
          "lib/arm64-v8a/libBugly.so",
          "libBugly.so"
        ],
        "assets": []
      },
      {
        "vendor": "腾讯乐固",
        "classes": [
          "com.tencent.StubShell.TxAppEntry",
          "MyWrapperProxyApplication",
          "com.wrapper.proxyapplication.WrapperProxyApplication"
        ],
        "so": [],
        "assets": [
          "libshellx"
        ]
      },
      {
        "vendor": "腾讯乐固（VMP）",
        "classes": [],
        "so": [
          "lib/arm64-v8a/libxgVipSecurity.so",
          "lib/armeabi-v7a/libxgVipSecurity.so",
          "libxgVipSecurity.so"
        ],
        "assets": []
      },
      {
        "vendor": "腾讯乐固（旧版）",
        "classes": [],
        "so": [
          "libtup.so",
          "liblegudb.so"
        ],
        "assets": [
          "mix.dex",
          "libshella",
          "mixz.dex",
          "libshel1x"
        ]
      },
      {
        "vendor": "腾讯云",
        "classes": [],
        "so": [
          "lib/armeabi/libshell-super.2019.so",
          "lib/armeabi/libshell-super.2020.so",
          "lib/armeabi/libshell-super.2021.so",
          "lib/armeabi/libshell-super.2022.so",
          "lib/armeabi/libshell-super.2023.so"
        ],
        "assets": [
          "assets/libshellx-super.2021.so",
          "tencent_sub"
        ]
      },
      {
        "vendor": "腾讯云移动应用安全",
        "classes": [],
        "so": [],
        "assets": [
          "0000000lllll.dex",
          "00000olllll.dex",
          "000O00ll111l.dex",
          "00O000ll111l.dex",
          "0OO00l111l1l",
          "o0oooOO0ooOo.dat"
        ]
      },
      {
        "vendor": "腾讯云移动应用安全（腾讯御安全）",
        "classes": [],
        "so": [
          "libBugly-yaq.so",
          "libshell-super.2019.so",
          "libshellx-super.2019.so",
          "libzBugly-yaq.so"
        ],
        "assets": [
          "t86",
          "tosprotection",
          "tosversion",
          "000000011111.dex",
          "000000111111.dex",
          "000001111111",
          "00000o11111.dex",
          "o0ooo000oo0o.dat"
        ]
      },
      {
        "vendor": "腾讯加固",
        "classes": [],
        "so": [
          "lib/armeabi/libshella-xxxx.so",
          "lib/armeabi/libshellx-xxxx.so"
        ],
        "assets": [
          "lib/armeabi/mix.dex",
          "lib/armeabi/mixz.dex",
          "tencent_stub"
        ]
      },
      {
        "vendor": "腾讯御安全",
        "classes": [],
        "so": [
          "libtosprotection.armeabi-v7a.so",
          "libtosprotection.armeabi.so",
          "libtosprotection.x86.so",
          "lib/armeabi/libTmsdk-xxx-mfr.so",
          "lib/armeabi/libtest.so"
        ],
        "assets": [
          "assets/libtosprotection.armeabi-v7a.so",
          "assets/libtosprotection.armeabi.so",
          "assets/libtosprotection.x86.so",
          "assets/tosversion"
        ]
      },
      {
        "vendor": "蛮犀",
        "classes": [],
        "so": [
          "libdSafeShell.so"
        ],
        "assets": [
          "assets/mxsafe.config",
          "assets/mxsafe.data",
          "assets/mxsafe.jar",
          "assets/mxsafe/arm64-v8a/libdSafeShell.so",
          "assets/mxsafe/x86_64/libdSafeShell.so"
        ]
      },
      {
        "vendor": "通付盾",
        "classes": [
          "com.tongfudun.android.shell.SuperApplication"
        ],
        "so": [
          "libegis.so",
          "lib/armeabi/libegis.so"
        ],
        "assets": []
      },
      {
        "vendor": "阿里加固",
        "classes": [],
        "so": [],
        "assets": [
          "assets/armeabi/libfakejni.so",
          "assets/armeabi/libzuma.so",
          "assets/classes.dex.dat",
          "assets/dp.arm-v7.so.dat",
          "assets/dp.arm.so.dat",
          "assets/libpreverify1.so",
          "assets/libzuma.so",
          "assets/libzumadata.so",
          "dexprotect"
        ]
      },
      {
        "vendor": "阿里聚安全",
        "classes": [],
        "so": [
          "libdemolish.so",
          "libfakejni.so",
          "libmobisec.so",
          "libsgmain.so",
          "libzuma.so",
          "libzumadata.so",
          "libdemolishdata.so",
          "libpreverify1.so",
          "libsgsecuritybody.so"
        ],
        "assets": [
          "aliprotect.dat"
        ]
      },
      {
        "vendor": "顶像科技",
        "classes": [
          "cn.securitystack.stee.AppStub"
        ],
        "so": [
          "libx3g.so",
          "lib/armeabi/libx3g.so"
        ],
        "assets": []
      }
    ],
    "descZh": "Android 加固厂商特征库（shell_vendors：application 类名 / so / assets 三路检测）",
    "descEn": "Android packer vendor library (shell_vendors: classes / so / assets)",
    "count": 39
  },
  {
    "id": "apk-perm",
    "nameZh": "Android 敏感权限",
    "nameEn": "Android Permissions",
    "kind": "kv",
    "data": [
      {
        "key": "android.permission.ACCESS_FINE_LOCATION",
        "value": "精确定位(GPS)"
      },
      {
        "key": "android.permission.ACCESS_COARSE_LOCATION",
        "value": "粗略定位(基站/WiFi)"
      },
      {
        "key": "android.permission.ACCESS_BACKGROUND_LOCATION",
        "value": "后台持续定位"
      },
      {
        "key": "android.permission.CONTROL_LOCATION_UPDATES",
        "value": "控制定位更新开关"
      },
      {
        "key": "android.permission.READ_CONTACTS",
        "value": "读取联系人"
      },
      {
        "key": "android.permission.WRITE_CONTACTS",
        "value": "写入联系人"
      },
      {
        "key": "android.permission.READ_CALL_LOG",
        "value": "读取通话记录"
      },
      {
        "key": "android.permission.WRITE_CALL_LOG",
        "value": "写入通话记录"
      },
      {
        "key": "android.permission.CALL_PHONE",
        "value": "直接拨打电话"
      },
      {
        "key": "android.permission.ANSWER_PHONE_CALLS",
        "value": "接听来电"
      },
      {
        "key": "android.permission.PROCESS_OUTGOING_CALLS",
        "value": "监听外呼电话"
      },
      {
        "key": "android.permission.READ_PHONE_STATE",
        "value": "读取设备/通话状态与IMEI"
      },
      {
        "key": "android.permission.READ_PHONE_NUMBERS",
        "value": "读取本机手机号码"
      },
      {
        "key": "android.permission.ADD_VOICEMAIL",
        "value": "添加语音信箱"
      },
      {
        "key": "android.permission.SEND_SMS",
        "value": "发送短信(可能产生资费)"
      },
      {
        "key": "android.permission.READ_SMS",
        "value": "读取短信"
      },
      {
        "key": "android.permission.RECEIVE_SMS",
        "value": "接收/拦截短信"
      },
      {
        "key": "android.permission.RECEIVE_MMS",
        "value": "接收彩信"
      },
      {
        "key": "android.permission.CAMERA",
        "value": "使用相机"
      },
      {
        "key": "android.permission.RECORD_AUDIO",
        "value": "录音/麦克风"
      },
      {
        "key": "android.permission.BODY_SENSORS",
        "value": "读取身体传感器(心率等)"
      },
      {
        "key": "android.permission.BODY_SENSORS_BACKGROUND",
        "value": "后台读取身体传感器"
      },
      {
        "key": "android.permission.ACTIVITY_RECOGNITION",
        "value": "识别身体活动(计步)"
      },
      {
        "key": "android.permission.READ_EXTERNAL_STORAGE",
        "value": "读取外部存储"
      },
      {
        "key": "android.permission.WRITE_EXTERNAL_STORAGE",
        "value": "写入外部存储"
      },
      {
        "key": "android.permission.MANAGE_EXTERNAL_STORAGE",
        "value": "所有文件访问权限"
      },
      {
        "key": "android.permission.READ_MEDIA_IMAGES",
        "value": "读取图片(API33+)"
      },
      {
        "key": "android.permission.READ_MEDIA_VIDEO",
        "value": "读取视频(API33+)"
      },
      {
        "key": "android.permission.READ_MEDIA_AUDIO",
        "value": "读取音频(API33+)"
      },
      {
        "key": "android.permission.ACCESS_MEDIA_LOCATION",
        "value": "读取媒体文件中的位置信息"
      },
      {
        "key": "android.permission.READ_CALENDAR",
        "value": "读取日历"
      },
      {
        "key": "android.permission.WRITE_CALENDAR",
        "value": "写入日历"
      },
      {
        "key": "android.permission.GET_ACCOUNTS",
        "value": "读取设备账户列表"
      },
      {
        "key": "android.permission.USE_BIOMETRIC",
        "value": "生物识别"
      },
      {
        "key": "android.permission.USE_FINGERPRINT",
        "value": "指纹识别(旧)"
      },
      {
        "key": "android.permission.BIND_DEVICE_ADMIN",
        "value": "设备管理器(可锁屏/擦除数据)"
      },
      {
        "key": "android.permission.BIND_ACCESSIBILITY_SERVICE",
        "value": "无障碍服务(可读屏与操控)"
      },
      {
        "key": "android.permission.SYSTEM_ALERT_WINDOW",
        "value": "悬浮窗(界面劫持风险)"
      },
      {
        "key": "android.permission.QUERY_ALL_PACKAGES",
        "value": "枚举所有已安装应用"
      },
      {
        "key": "android.permission.PACKAGE_USAGE_STATS",
        "value": "读取应用使用统计"
      },
      {
        "key": "android.permission.REQUEST_INSTALL_PACKAGES",
        "value": "安装其他应用"
      },
      {
        "key": "android.permission.REQUEST_DELETE_PACKAGES",
        "value": "卸载应用"
      },
      {
        "key": "android.permission.RECEIVE_BOOT_COMPLETED",
        "value": "开机自启动"
      },
      {
        "key": "android.permission.POST_NOTIFICATIONS",
        "value": "发送通知"
      },
      {
        "key": "android.permission.NFC",
        "value": "NFC"
      },
      {
        "key": "android.permission.BLUETOOTH_SCAN",
        "value": "蓝牙扫描(发现周边设备)"
      },
      {
        "key": "android.permission.BLUETOOTH_CONNECT",
        "value": "蓝牙连接"
      },
      {
        "key": "android.permission.BLUETOOTH_ADMIN",
        "value": "蓝牙管理(旧)"
      },
      {
        "key": "android.permission.READ_PROFILE",
        "value": "读取用户资料(旧)"
      }
    ],
    "descZh": "需要关注的 Android 敏感权限（apk_permissions）",
    "descEn": "Notable Android permissions (apk_permissions)",
    "count": 49
  },
  {
    "id": "ios-perm",
    "nameZh": "iOS 敏感权限",
    "nameEn": "iOS Permissions",
    "kind": "kv",
    "data": [
      {
        "key": "NSCameraUsageDescription",
        "value": "相机"
      },
      {
        "key": "NSMicrophoneUsageDescription",
        "value": "麦克风/录音"
      },
      {
        "key": "NSPhotoLibraryUsageDescription",
        "value": "读取相册"
      },
      {
        "key": "NSPhotoLibraryAddUsageDescription",
        "value": "写入相册"
      },
      {
        "key": "NSLocationWhenInUseUsageDescription",
        "value": "使用期间定位"
      },
      {
        "key": "NSLocationAlwaysAndWhenInUseUsageDescription",
        "value": "始终允许定位"
      },
      {
        "key": "NSLocationAlwaysUsageDescription",
        "value": "始终定位(旧键)"
      },
      {
        "key": "NSContactsUsageDescription",
        "value": "通讯录"
      },
      {
        "key": "NSCalendarsUsageDescription",
        "value": "日历"
      },
      {
        "key": "NSRemindersUsageDescription",
        "value": "提醒事项"
      },
      {
        "key": "NSMotionUsageDescription",
        "value": "运动与健身数据"
      },
      {
        "key": "NSHealthShareUsageDescription",
        "value": "读取健康数据"
      },
      {
        "key": "NSHealthUpdateUsageDescription",
        "value": "写入健康数据"
      },
      {
        "key": "NSFaceIDUsageDescription",
        "value": "Face ID"
      },
      {
        "key": "NSAppleMusicUsageDescription",
        "value": "媒体资料库(音乐)"
      },
      {
        "key": "NSBluetoothAlwaysUsageDescription",
        "value": "蓝牙"
      },
      {
        "key": "NSBluetoothPeripheralUsageDescription",
        "value": "蓝牙外设(旧键)"
      },
      {
        "key": "NSSpeechRecognitionUsageDescription",
        "value": "语音识别"
      },
      {
        "key": "NSLocalNetworkUsageDescription",
        "value": "本地网络访问"
      },
      {
        "key": "NSUserTrackingUsageDescription",
        "value": "跨应用追踪(IDFA)"
      },
      {
        "key": "NSHomeKitUsageDescription",
        "value": "HomeKit智能家居"
      },
      {
        "key": "NSSiriUsageDescription",
        "value": "Siri"
      }
    ],
    "descZh": "需要关注的 iOS 隐私权限（ios_permissions）",
    "descEn": "Notable iOS privacy permissions (ios_permissions)",
    "count": 22
  },
  {
    "id": "extract",
    "nameZh": "提取与忽略",
    "nameEn": "Extract / Ignore",
    "kind": "lists",
    "data": [
      {
        "group": "filter_strs 提取正则",
        "items": [
          "(?i)(?:jdbc(?::[a-z0-9]+)*:(?:@)?//.*|(?:https?|ftps?|sftp|wss?|ssl|tcp|udp|ssh|telnet|smtp|imap|pop3?|ldaps?|rtmps?|rtsps?|mysql|mariadb|mssql|mongodb|redis|memcached|amqp|mqtt|file|gopher)://.*)",
          ".*://((?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)).*",
          "^((?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?::\\d{1,5})?)(?:/.*)?$",
          "((?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|:(?::[0-9a-fA-F]{1,4}){1,7}|(?:[0-9a-fA-F]{1,4}:){1,7}:)"
        ]
      },
      {
        "group": "filter_no 忽略正则",
        "items": [
          "^0\\.",
          "^255\\.255\\.255\\.255$",
          "^(?:192\\.0\\.2|198\\.51\\.100|203\\.0\\.113)\\.",
          "::1",
          "::$"
        ]
      }
    ],
    "descZh": "内容提取与忽略正则（filter_strs / filter_no）",
    "descEn": "Extraction and ignore regexes (filter_strs / filter_no)",
    "count": 9
  },
  {
    "id": "domains",
    "nameZh": "公共域名后缀",
    "nameEn": "Public Domain Suffixes",
    "kind": "domains",
    "data": [
      "w3.org",
      "whatwg.org",
      "ietf.org",
      "unicode.org",
      "json.org",
      "xml.org",
      "oasis-open.org",
      "xmlsoap.org",
      "openxmlformats.org",
      "schema.org",
      "openssl.org",
      "sqlite.org",
      "zlib.net",
      "in-addr.arpa",
      "ip6.arpa",
      "apache.org",
      "github.com",
      "github.io",
      "githubusercontent.com",
      "npmjs.com",
      "npmjs.org",
      "pypi.org",
      "rubygems.org",
      "maven.org",
      "sonatype.org",
      "jitpack.io",
      "gradle.org",
      "spring.io",
      "hibernate.org",
      "jetbrains.com",
      "mozilla.org",
      "gnu.org",
      "debian.org",
      "sourceforge.net",
      "kernel.org",
      "python.org",
      "golang.org",
      "rust-lang.org",
      "nodejs.org",
      "jquery.com",
      "getbootstrap.com",
      "jsdelivr.net",
      "unpkg.com",
      "cdnjs.cloudflare.com",
      "cdn.bootcss.com",
      "staticfile.org",
      "google.com",
      "googleapis.com",
      "gstatic.com",
      "googleusercontent.com",
      "googlesource.com",
      "googlecode.com",
      "google-analytics.com",
      "googletagmanager.com",
      "googlesyndication.com",
      "googleadservices.com",
      "doubleclick.net",
      "app-measurement.com",
      "android.com",
      "firebaseio.com",
      "crashlytics.com",
      "fabric.io",
      "flutter.dev",
      "pub.dev",
      "dart.dev",
      "apple.com",
      "icloud.com",
      "mzstatic.com",
      "cdn-apple.com",
      "apple-cloudkit.com",
      "digicert.com",
      "verisign.com",
      "symantec.com",
      "symcb.com",
      "symcd.com",
      "geotrust.com",
      "thawte.com",
      "entrust.net",
      "globalsign.com",
      "letsencrypt.org",
      "sectigo.com",
      "comodoca.com",
      "starfieldtech.com",
      "addtrust.com",
      "secomtrust.net",
      "microsoft.com",
      "nuget.org",
      "xamarin.com",
      "live.com",
      "windows.com",
      "msftconnecttest.com",
      "msftncsi.com",
      "umeng.com",
      "umengcloud.com",
      "jpush.cn",
      "jiguang.cn",
      "getui.com",
      "igexin.com",
      "bugly.qq.com",
      "talkingdata.com",
      "sensorsdata.cn",
      "sensorsdata.com",
      "growingio.com",
      "appsflyer.com",
      "appsee.com",
      "bdstatic.com",
      "bdimg.com",
      "hm.baidu.com",
      "mmstat.com",
      "alicdn.com",
      "aliapp.org",
      "amap.com",
      "gtimg.com",
      "qpic.cn",
      "hicloud.com",
      "netease.im",
      "yunpian.com",
      "rongcloud.cn",
      "easemob.com",
      "uc.cn",
      "example.com",
      "example.org",
      "example.net",
      "example.edu",
      "pool.ntp.org"
    ],
    "descZh": "公共域名后缀表（filter_no_domains，命中 host 或任意父域后缀即丢弃）",
    "descEn": "Public domain suffix table (filter_no_domains)",
    "count": 125
  }
]

export const rulesTotal = 375
export const rulesSourceVersion = '1.0.11'
