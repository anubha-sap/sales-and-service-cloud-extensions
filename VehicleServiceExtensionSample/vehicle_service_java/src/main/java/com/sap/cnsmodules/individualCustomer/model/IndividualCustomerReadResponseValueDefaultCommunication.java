

/*
 * Individual Customer Service
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

package com.sap.cnsmodules.individualCustomer.model;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonValue;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

/**
 * IndividualCustomerReadResponseValueDefaultCommunication
 */

// CHECKSTYLE:OFF
public class IndividualCustomerReadResponseValueDefaultCommunication 
// CHECKSTYLE:ON
{
  @JsonProperty("eMail")
  private String eMail;

  @JsonProperty("phoneFormattedNumber")
  private String phoneFormattedNumber;

  @JsonProperty("phoneNormalisedNumber")
  private String phoneNormalisedNumber;

  @JsonAnySetter
  private final Map<String, Object> cloudSdkCustomFields = new LinkedHashMap<>();

   /**
   * Set the eMail of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance and return the same instance.
   *
   * @param eMail  The eMail of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
   * @return The same instance of this {@link IndividualCustomerReadResponseValueDefaultCommunication} class
   */
   @Nonnull public IndividualCustomerReadResponseValueDefaultCommunication eMail(@Nonnull final String eMail) {
    this.eMail = eMail;
    return this;
  }

   /**
   * Get eMail
   * @return eMail  The eMail of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  **/
  @Nonnull public String geteMail() {
    return eMail;
  }

  /**
  * Set the eMail of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  *
  * @param eMail  The eMail of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
  */
  public void seteMail( @Nonnull final String eMail) {
    this.eMail = eMail;
  }

   /**
   * Set the phoneFormattedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance and return the same instance.
   *
   * @param phoneFormattedNumber  The phoneFormattedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
   * @return The same instance of this {@link IndividualCustomerReadResponseValueDefaultCommunication} class
   */
   @Nonnull public IndividualCustomerReadResponseValueDefaultCommunication phoneFormattedNumber(@Nonnull final String phoneFormattedNumber) {
    this.phoneFormattedNumber = phoneFormattedNumber;
    return this;
  }

   /**
   * Get phoneFormattedNumber
   * @return phoneFormattedNumber  The phoneFormattedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  **/
  @Nonnull public String getPhoneFormattedNumber() {
    return phoneFormattedNumber;
  }

  /**
  * Set the phoneFormattedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  *
  * @param phoneFormattedNumber  The phoneFormattedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
  */
  public void setPhoneFormattedNumber( @Nonnull final String phoneFormattedNumber) {
    this.phoneFormattedNumber = phoneFormattedNumber;
  }

   /**
   * Set the phoneNormalisedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance and return the same instance.
   *
   * @param phoneNormalisedNumber  The phoneNormalisedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
   * @return The same instance of this {@link IndividualCustomerReadResponseValueDefaultCommunication} class
   */
   @Nonnull public IndividualCustomerReadResponseValueDefaultCommunication phoneNormalisedNumber(@Nonnull final String phoneNormalisedNumber) {
    this.phoneNormalisedNumber = phoneNormalisedNumber;
    return this;
  }

   /**
   * Get phoneNormalisedNumber
   * @return phoneNormalisedNumber  The phoneNormalisedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  **/
  @Nonnull public String getPhoneNormalisedNumber() {
    return phoneNormalisedNumber;
  }

  /**
  * Set the phoneNormalisedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication} instance.
  *
  * @param phoneNormalisedNumber  The phoneNormalisedNumber of this {@link IndividualCustomerReadResponseValueDefaultCommunication}
  */
  public void setPhoneNormalisedNumber( @Nonnull final String phoneNormalisedNumber) {
    this.phoneNormalisedNumber = phoneNormalisedNumber;
  }

  /**
   * Get the names of the unrecognizable properties of the {@link IndividualCustomerReadResponseValueDefaultCommunication}.
   * @return The set of properties names
   */
  @Nonnull
  public Set<String> getCustomFieldNames() {
    return cloudSdkCustomFields.keySet();
  }

  /**
   * Get the value of an unrecognizable property of the {@link IndividualCustomerReadResponseValueDefaultCommunication}.
   * @param name  The name of the property
   * @return The value of the property
   * @throws NoSuchElementException  If no property with the given name could be found.
   */
  @Nullable
  public Object getCustomField(@Nonnull final String name) throws NoSuchElementException {
    if( !cloudSdkCustomFields.containsKey(name) ) {
        throw new NoSuchElementException("IndividualCustomerReadResponseValueDefaultCommunication has no field with name '" + name + "'.");
    }
    return cloudSdkCustomFields.get(name);
  }

  @Override
  public boolean equals(@Nullable final java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    final IndividualCustomerReadResponseValueDefaultCommunication individualCustomerReadResponseValueDefaultCommunication = (IndividualCustomerReadResponseValueDefaultCommunication) o;
    return Objects.equals(this.cloudSdkCustomFields, individualCustomerReadResponseValueDefaultCommunication.cloudSdkCustomFields) &&
        Objects.equals(this.eMail, individualCustomerReadResponseValueDefaultCommunication.eMail) &&
        Objects.equals(this.phoneFormattedNumber, individualCustomerReadResponseValueDefaultCommunication.phoneFormattedNumber) &&
        Objects.equals(this.phoneNormalisedNumber, individualCustomerReadResponseValueDefaultCommunication.phoneNormalisedNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(eMail, phoneFormattedNumber, phoneNormalisedNumber, cloudSdkCustomFields);
  }

  @Override
  @Nonnull public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append("class IndividualCustomerReadResponseValueDefaultCommunication {\n");
    sb.append("    eMail: ").append(toIndentedString(eMail)).append("\n");
    sb.append("    phoneFormattedNumber: ").append(toIndentedString(phoneFormattedNumber)).append("\n");
    sb.append("    phoneNormalisedNumber: ").append(toIndentedString(phoneNormalisedNumber)).append("\n");
    cloudSdkCustomFields.forEach((k,v) -> sb.append("    ").append(k).append(": ").append(toIndentedString(v)).append("\n"));
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(final java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

