import {FooterSimple} from "@/components/Navbar/FooterSimple";

export default function HomePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>MentorMeets</h1>

      <h2>About MentorMeets</h2>
      <p>
        MentorMeets is a platform designed specifically for college students to connect over casual coffee chats. Our goal is to help students build their networks, share experiences, and foster meaningful connections in a relaxed, informal setting.
      </p>
      <p>
        When you sign in with Google, we’ll receive your name, email, and profile picture. We respect your privacy and will only use this information to enhance your experience on our platform. We won't share your data with third parties and will only contact you regarding your coffee chat matches or important updates.
      </p>

      <h2>Google OAuth2 Homepage</h2>
      <ul>
        <li><strong>Accurately represents your app's identity:</strong> MentorMeets is for students, by students, dedicated to helping students network and grow. It’s not a company or a business; it’s a community platform for student engagement. The website enables students to schedule and manage coffee chats.</li>
        <li><strong>What will this app do with user data?</strong> The only user data we receive are your name, email, and profile picture. These are used to create your profile, connect you with other students, and send notifications about your scheduled coffee chats. Your email may be used to communicate important updates and confirmations related to your coffee chats.</li>
        <li><strong>How does this app enhance user functionality?</strong> MentorMeets enhances functionality by allowing students to easily sign up for and manage coffee chats. By signing in, users gain access to features such as profile customization, chat scheduling, and reminders.</li>
        <li><strong>Link to Privacy Policy:</strong> <a href="/privacypolicy">Click here</a></li>
        <li><strong>Describe the content, context, or connection to the app:</strong> MentorMeets is a platform designed to facilitate networking among college students. Users can schedule coffee chats, view profiles of other students, and receive reminders about their meetings. The intention is to foster a supportive community where students can learn from each other and build professional connections.</li>
      </ul>

      <h2>Google OAuth2 Limited Use Disclosure</h2>
      <p>
        MentorMeets's use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. This app only requests access to basic profile information and does not request restricted scopes.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies to manage user sessions and enhance your experience. Cookies help us keep you logged in and remember your preferences. By using our site, you consent to our use of cookies.
      </p>

      <h2>Terms of Service</h2>
      <p>
        MentorMeets is provided "as is" without any warranties. We aim to provide a reliable service but do not guarantee any specific outcomes or availability. By using our site, you accept these terms of service in full. If you disagree with these terms, please do not use our site.
      </p>

      <h2>Copyright</h2>
      <p>
        If you have any copyright concerns, please contact us with the details of the issue. Include the URL, a description of the content in question, and your contact information. We will address your concerns promptly.
      </p>

      <script type="text/typescript">
        // Placeholder for any TypeScript logic, if needed.
      </script>
      <FooterSimple />
    </div>
  );
}
