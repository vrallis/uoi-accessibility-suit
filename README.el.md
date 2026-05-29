# Σουίτα Προσβασιμότητας ΠΙ

<p align="right">
  <a href="README.md">English</a> · <strong>Ελληνικά</strong>
</p>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Firefox](https://img.shields.io/badge/Firefox-142%2B-orange.svg?logo=firefox)](https://addons.mozilla.org/firefox/)
[![Chromium](https://img.shields.io/badge/Chromium-supported-4285F4.svg?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![Release](https://img.shields.io/github/v/release/vrallis/uoi-accessibility-suit)](https://github.com/vrallis/uoi-accessibility-suit/releases)

Επέκταση φυλλομετρητή (Firefox + Chromium, Manifest V3) που βελτιώνει την προσβασιμότητα και χρηστικότητα σε διαδικτυακές πλατφόρμες του Πανεπιστημίου Ιωαννίνων.

---

## Λειτουργίες

### eCourse — Ανάπτυξη Φακέλων
Αναπτύσσει τα περιεχόμενα φακέλων **ενσωματωμένα** στη σελίδα `ecourse.uoi.gr` — χωρίς νέα καρτέλα, χωρίς επαναφόρτωση. Κάθε φάκελος αποκτά κουμπί ανάπτυξης· το κουμπί **Επέκταση Όλων** στο popup αναπτύσσει τα πάντα με ένα κλικ.

### MODIP — Διορθώσεις Εμφάνισης & Προσβασιμότητας
Εφαρμόζει διορθώσεις εμφάνισης και βελτιώσεις προσβασιμότητας στα ερωτηματολόγια του `evaluate.modip.uoi.gr`:
- **Διορθώσεις Εμφάνισης** — διορθώνει οπτικά προβλήματα στοίχισης και εμφάνισης
- **Μεγάλο Κείμενο & Αριθμοί** — μεγεθύνει τους αριθμούς ερωτήσεων για καλύτερη αναγνωσιμότητα

Και οι δύο λειτουργίες ενεργοποιούνται/απενεργοποιούνται ανεξάρτητα από το popup.

---

## Εγκατάσταση

### Από έκδοση (προτείνεται)
1. Κατεβάστε το τελευταίο `.xpi` (Firefox) ή `.zip` (Chromium) από τις [Εκδόσεις](https://github.com/vrallis/uoi-accessibility-suit/releases).
2. **Firefox:** Σύρετε το `.xpi` στη σελίδα `about:addons`, ή εγκαταστήστε μέσω του Διαχειριστή Προσθέτων.
3. **Chromium:** Μεταβείτε στη σελίδα `chrome://extensions`, ενεργοποιήστε τη Λειτουργία Προγραμματιστή, κάντε κλικ στο **Φόρτωση μη συσκευασμένης** και επιλέξτε τον αποσυμπιεσμένο φάκελο.

### Από τον πηγαίο κώδικα
```sh
git clone https://github.com/vrallis/uoi-accessibility-suit.git
```
Στη συνέχεια φορτώστε τον κατάλογο `src/` ως μη συσκευασμένη επέκταση (βλ. βήμα 3 παραπάνω για Chromium, ή `about:debugging` → Φόρτωση Προσωρινού Πρόσθετου για Firefox).

---

## Χρήση

Κάντε κλικ στο εικονίδιο της επέκτασης σε οποιαδήποτε υποστηριζόμενη σελίδα.

- **Καρτέλα eCourse** — κάντε κλικ στο **Επέκταση Όλων των Φακέλων** ενώ βρίσκεστε σε σελίδα μαθήματος του `ecourse.uoi.gr`.
- **Καρτέλα MODIP** — εναλλάξτε τις Διορθώσεις Εμφάνισης και το Μεγάλο Κείμενο & Αριθμοί· οι αλλαγές εφαρμόζονται άμεσα.
- **Εναλλαγή γλώσσας** — αλλάξτε μεταξύ Ελληνικών (EL) και Αγγλικών (EN) στο κάτω μέρος του popup.

---

## Υποστηριζόμενες Πλατφόρμες

| Πλατφόρμα | URL |
|-----------|-----|
| eCourse (Moodle) | `https://ecourse.uoi.gr/*` |
| MODIP | `https://evaluate.modip.uoi.gr/*` |

---

## Άδεια Χρήσης

GNU General Public License v3.0 — δείτε το αρχείο [LICENSE](LICENSE).

---

Φτιαγμένο με ♥ από την ομάδα [Orailab](https://orailab.gr).
