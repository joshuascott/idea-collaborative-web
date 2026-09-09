<?php
/**
 * Bluehost contact form handler.
 * Forms POST here from ContactForm.astro. Netlify Forms are not used.
 *
 * Requires hello@ideacollaborative.com (or another mailbox on this domain)
 * to exist in cPanel so PHP mail() can send with a From address Bluehost accepts.
 */

declare(strict_types=1);

const MAIL_TO = 'hello@ideacollaborative.com';
const MAIL_FROM = 'hello@ideacollaborative.com';
const MIN_SECONDS = 4;
const MAX_SECONDS = 86400; // 24 hours

function redirect(string $path): never
{
    header('Location: ' . $path, true, 303);
    exit;
}

function fail(): never
{
    redirect('/contact?error=1');
}

function ok(): never
{
    redirect('/thanks');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('/contact');
}

// Honeypot: bots fill hidden "company-website"; humans leave it empty.
$honeypot = trim((string) ($_POST['company-website'] ?? ''));
if ($honeypot !== '') {
    // Quiet success so scrapers learn nothing.
    ok();
}

// Time trap: form_ts is set when the page loads; reject instant posts.
$ts = filter_var($_POST['form_ts'] ?? '', FILTER_VALIDATE_INT);
$now = time();
if ($ts === false || $ts < 1) {
    fail();
}
$elapsed = $now - $ts;
if ($elapsed < MIN_SECONDS || $elapsed > MAX_SECONDS) {
    fail();
}

function clean_line(string $value, int $max = 500): string
{
    $value = str_replace(["\r", "\n", "\0"], '', $value);
    $value = trim($value);
    if (strlen($value) > $max) {
        $value = substr($value, 0, $max);
    }
    return $value;
}

function clean_body(string $value, int $max = 5000): string
{
    $value = str_replace("\0", '', $value);
    $value = trim($value);
    if (strlen($value) > $max) {
        $value = substr($value, 0, $max);
    }
    return $value;
}

$formName = clean_line((string) ($_POST['form-name'] ?? 'contact'), 80);
$name = clean_line((string) ($_POST['name'] ?? ''), 200);
$business = clean_line((string) ($_POST['business'] ?? ''), 200);
$email = clean_line((string) ($_POST['email'] ?? ''), 200);
$phone = clean_line((string) ($_POST['phone'] ?? ''), 80);
$message = clean_body((string) ($_POST['message'] ?? ''));

if ($name === '' || $business === '' || $email === '' || $message === '') {
    fail();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail();
}

// Known optional / extra fields from ContactForm variants.
$extraKeys = [
    'interest',
    'size',
    'industry',
    'tried',
    'town',
    'company_type',
    'brokerage',
];

$lines = [
    'Form: ' . $formName,
    'Name: ' . $name,
    'Business: ' . $business,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : '(not provided)'),
];

foreach ($extraKeys as $key) {
    if (!isset($_POST[$key])) {
        continue;
    }
    $val = is_string($_POST[$key]) ? clean_body($_POST[$key], 2000) : '';
    if ($val === '') {
        continue;
    }
    $label = str_replace('_', ' ', $key);
    $lines[] = ucfirst($label) . ': ' . $val;
}

$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message;
$lines[] = '';
$lines[] = '---';
$lines[] = 'IP: ' . clean_line((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 64);
$lines[] = 'UA: ' . clean_line((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 300);

$body = implode("\n", $lines);
$subject = 'Website form: ' . $formName . ' from ' . $name;

$headers = [
    'From: Idea Collaborative <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: IdeaCollaborative-contact.php',
];

$sent = @mail(MAIL_TO, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    fail();
}

ok();
