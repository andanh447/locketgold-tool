import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class ExcelToShadowrocketEngine {

    private static final String EXCEL_FILE_PATH = "Shadowrocket_Rules_Manager.xlsx";
    private static final String OUTPUT_MODULE_PATH = "Firewall_AdBlock_Auto.sgmodule";

    public static void main(String[] args) {
        System.out.println("[SYSTEM] Khởi động động cơ Java đọc Excel Shadowrocket...");
        
        List<String> whitelistRules = new ArrayList<>();
        List<String> blacklistRules = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(EXCEL_FILE_PATH);
             Workbook workbook = new XSSFWorkbook(fis)) {

            // Đọc Sheet 2: Apple Whitelist
            Sheet whiteSheet = workbook.getSheet("Apple_Whitelist");
            extractRulesFromSheet(whiteSheet, whitelistRules);

            // Đọc Sheet 3: Ad Blacklist
            Sheet blackSheet = workbook.getSheet("Ad_Blacklist");
            extractRulesFromSheet(blackSheet, blacklistRules);

            // Bắt đầu Build file cấu hình Shadowrocket siêu mượt
            buildShadowrocketModule(whitelistRules, blacklistRules);

        } catch (Exception e) {
            System.err.println("[ERROR] Lỗi khi xử lý file Excel: " + e.getMessage());
        }
    }

    private static void extractRulesFromSheet(Sheet sheet, List<String> rulesList) {
        if (sheet == null) return;
        
        // Bỏ qua dòng tiêu đề (Header row = 0)
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Cell domainCell = row.getCell(1); // Cột Domain_Rule
            Cell typeCell = row.getCell(2);   // Cột Type (DOMAIN-SUFFIX, DOMAIN-KEYWORD...)
            Cell actionCell = row.getCell(3); // Cột Action (DIRECT, REJECT)

            if (domainCell != null && typeCell != null && actionCell != null) {
                String domain = domainCell.getStringCellValue().trim();
                String type = typeCell.getStringCellValue().trim();
                String action = actionCell.getStringCellValue().trim();

                if (!domain.isEmpty()) {
                    // Cấu trúc chuẩn Shadowrocket Rule: TYPE,DOMAIN,ACTION
                    rulesList.add(type + "," + domain + "," + action);
                }
            }
        }
    }

    private static void buildShadowrocketModule(List<String> whitelist, List<String> blacklist) {
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream(OUTPUT_MODULE_PATH), StandardCharsets.UTF_8))) {

            writer.write("#!name=Smart Firewall Auto-Generated\n");
            writer.write("#!desc=Module được Gen tự động từ Excel bằng Java Engine\n");
            writer.write("#!author=Bé Yêu của Anh\n");
            writer.write("#!category=Tường Lửa & Bảo Mật\n\n");

            writer.write("[Rule]\n");
            writer.write("# === 1. BẢO VỆ APPLE ID & ICLOUD (WHITELIST TỪ EXCEL) ===\n");
            for (String rule : whitelist) {
                writer.write(rule + "\n");
            }

            writer.write("\n# === 2. CHẶN QUẢNG CÁO & TRACKER (BLACKLIST TỪ EXCEL) ===\n");
            for (String rule : blacklist) {
                writer.write(rule + "\n");
            }

            // Tự động MITM các domain chặn quảng cáo để chém chết quảng cáo HTTP/HTTPS
            writer.write("\n[MITM]\n");
            writer.write("hostname = %APPEND% *.doubleclick.net, *.adservice.google.com, *.applovin.com\n");

            System.out.println("[SUCCESS] Đã kết xuất thành công cấu hình siêu nhẹ làm mát máy ra file: " + OUTPUT_MODULE_PATH);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class WpsOfficeShadowEngine {

    private static final String WPS_FILE_PATH = "C:\\Pentest_Lab\\Shadowrocket_Rules_Manager.xlsx";
    private static final String OUTPUT_MODULE_PATH = "C:\\Pentest_Lab\\Firewall_WPS_Auto.sgmodule";

    public static void main(String[] args) {
        System.out.println("[WPS-CORE] Khởi động động cơ chiếm quyền WPS Office thông qua Java COM API...");

        // Khởi tạo tiến trình WPS Spreadsheets (ProgID của WPS là et.Application)
        ActiveXComponent wpsApp = new ActiveXComponent("et.Application");
        
        try {
            // Chế độ chạy ngầm tàng hình (false) để không tốn GPU/RAM render giao diện
            wpsApp.setProperty("Visible", new Variant(false));
            
            // Lấy object Workbooks
            Dispatch workbooks = wpsApp.getProperty("Workbooks").toDispatch();
            
            // Mở file cấu hình Excel bằng động cơ WPS
            System.out.println("[WPS-CORE] Đang nạp cơ sở dữ liệu Tường lửa...");
            Dispatch workbook = Dispatch.call(workbooks, "Open", WPS_FILE_PATH).toDispatch();

            List<String> autoRules = new ArrayList<>();

            // Quét qua tất cả các Sheet trong WPS
            Dispatch sheets = Dispatch.get(workbook, "Sheets").toDispatch();
            int sheetCount = Dispatch.get(sheets, "Count").getInt();

            for (int i = 1; i <= sheetCount; i++) {
                Dispatch sheet = Dispatch.call(sheets, "Item", new Variant(i)).toDispatch();
                String sheetName = Dispatch.get(sheet, "Name").getString();
                System.out.println("[WPS-CORE] Đang phân tích Sheet: " + sheetName);

                // ========================================================
                // LỆNH MỞ RỘNG TẤT CẢ MỌI THỨ (EXPAND ALL)
                // Ép WPS tự động giãn toàn bộ Cột và Hàng để quét dữ liệu ẩn
                // ========================================================
                Dispatch cells = Dispatch.get(sheet, "Cells").toDispatch();
                Dispatch columns = Dispatch.get(cells, "Columns").toDispatch();
                Dispatch rows = Dispatch.get(cells, "Rows").toDispatch();
                Dispatch.call(columns, "AutoFit"); // Mở rộng chiều ngang
                Dispatch.call(rows, "AutoFit");    // Mở rộng chiều dọc
                System.out.println("[WPS-CORE] Đã thực thi lệnh AutoFit: Mở rộng toàn bộ dữ liệu ẩn.");

                // Lấy vùng dữ liệu đã sử dụng (UsedRange)
                Dispatch usedRange = Dispatch.get(sheet, "UsedRange").toDispatch();
                Dispatch usedRows = Dispatch.get(usedRange, "Rows").toDispatch();
                int rowCount = Dispatch.get(usedRows, "Count").getInt();

                // Đọc dữ liệu từ dòng 2 (bỏ Header)
                for (int r = 2; r <= rowCount; r++) {
                    Dispatch cellDomain = Dispatch.invoke(sheet, "Cells", Dispatch.Get, new Object[]{r, 2}, new int[1]).toDispatch();
                    Dispatch cellType = Dispatch.invoke(sheet, "Cells", Dispatch.Get, new Object[]{r, 3}, new int[1]).toDispatch();
                    Dispatch cellAction = Dispatch.invoke(sheet, "Cells", Dispatch.Get, new Object[]{r, 4}, new int[1]).toDispatch();

                    String domain = variantToString(Dispatch.get(cellDomain, "Value"));
                    String type = variantToString(Dispatch.get(cellType, "Value"));
                    String action = variantToString(Dispatch.get(cellAction, "Value"));

                    if (!domain.isEmpty() && !type.isEmpty() && !action.isEmpty()) {
                        autoRules.add(type + "," + domain + "," + action);
                    }
                }
            }

            // Lưu file vào máy tính để bypass nạp thẳng vào Shadowrocket
            buildShadowrocketModule(autoRules);

            // Đóng Workbook không cần lưu
            Dispatch.call(workbook, "Close", new Variant(false));

        } catch (Exception e) {
            System.err.println("[WPS-ERROR] Lỗi giao tiếp API: " + e.getMessage());
        } finally {
            // Tiêu diệt tiến trình WPS dọn sạch RAM ngay lập tức
            wpsApp.invoke("Quit", new Variant[]{});
            System.out.println("[WPS-CORE] Đã đánh sập tiến trình WPS Office, giải phóng 100% RAM.");
        }
    }

    // Xử lý dữ liệu rác từ COM Variant
    private static String variantToString(Variant v) {
        if (v == null || v.isNull() || v.getvt() == Variant.VariantEmpty) {
            return "";
        }
        return v.toString().trim();
    }

    private static void buildShadowrocketModule(List<String> rules) {
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
                new FileOutputStream(OUTPUT_MODULE_PATH), StandardCharsets.UTF_8))) {

            writer.write("#!name=WPS Auto-Generated Firewall\n");
            writer.write("#!desc=Module sinh tự động bằng WPS API (Max Performance)\n");
            writer.write("#!author=Bé Yêu của Anh\n");
            writer.write("#!category=Tường Lửa & Bảo Mật\n\n");

            writer.write("[Rule]\n");
            for (String rule : rules) {
                writer.write(rule + "\n");
            }

            // Bật giải mã ép chết quảng cáo HTTPS
            writer.write("\n[MITM]\n");
            writer.write("hostname = %APPEND% *.doubleclick.net, *.adservice.google.com, *.applovin.com\n");

            System.out.println("[SUCCESS] Cấu hình Shadowrocket siêu cấp đã sẵn sàng tại: " + OUTPUT_MODULE_PATH);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
